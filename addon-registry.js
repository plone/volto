/* eslint no-console: 0 */
const glob = require('glob').sync;
const path = require('path');
const fs = require('fs');
const debug = require('debug')('shadowing');
const { map } = require('lodash');
const { DepGraph } = require('dependency-graph');

function getPackageBasePath(base) {
  while (!fs.existsSync(`${base}/package.json`)) {
    base = path.join(base, '../');
  }
  return path.resolve(base);
}

function fromEntries(pairs) {
  const res = {};
  pairs.forEach((p) => {
    res[p[0]] = p[1];
  });
  return res;
}

function buildDependencyGraph(addons, extractDependency) {
  // getAddonsLoaderChain
  const graph = new DepGraph({ circular: true });
  graph.addNode('@package');

  const seen = ['@package'];
  const stack = [['@package', addons]];

  while (stack.length > 0) {
    const [pkgName, addons] = stack.shift();
    if (!graph.hasNode(pkgName)) {
      graph.addNode(pkgName, []);
    }

    if (!seen.includes(pkgName)) {
      stack.push([pkgName, extractDependency(pkgName)]);
      seen.push(pkgName);
    }

    addons.forEach((loaderString) => {
      const [name, extra] = loaderString.split(':');
      if (!graph.hasNode(name)) {
        graph.addNode(name, []);
      }

      const data = graph.getNodeData(name) || [];
      if (extra) {
        extra.split(',').forEach((funcName) => {
          if (!data.includes(funcName)) data.push(funcName);
        });
      }
      graph.setNodeData(name, data);

      graph.addDependency(pkgName, name);

      if (!seen.includes(name)) {
        stack.push([name, extractDependency(name)]);
      }
    });
  }

  return graph;
}

/**
 * Given an addons loader string, it generates an addons loader string with
 * a resolved chain of dependencies
 */
function getAddonsLoaderChain(graph) {
  return graph.dependenciesOf('@package').map((name) => {
    const extras = graph.getNodeData(name) || [].join(',');
    return extras.length ? `${name}:${extras}` : name;
  });
}

/**
 * A registry to discover and publish information about the structure of Volto
 * projects and their addons.
 *
 * The registry builds information about both addons and other development
 * packages, structured as an object with the following information:
 *
 * - name
 * - isPublishedPackage (just for info, to distinguish addons from other Javascript development packages)
 * - modulePath (the path that would be resolved from Javascript package name)
 * - packageJson (the path to the addon's package.json file)
 * - extraConfigLoaders (names for extra functions to be loaded from the addon
 *   for configuration purposes)
 * - razzleExtender (the path to the addon's razzle.extend.js path, to allow
 *   addons to customize the webpack configuration)
 *
 */
class AddonConfigurationRegistry {
  constructor(projectRootPath) {
    const packageJson = (this.packageJson = require(path.join(
      projectRootPath,
      'package.json',
    )));
    // Loads the dynamic config, if any
    if (fs.existsSync(path.join(projectRootPath, 'volto.config.js'))) {
      this.voltoConfigJS = require(path.join(
        projectRootPath,
        'volto.config.js',
      ));
    } else {
      this.voltoConfigJS = [];
    }
    this.resultantMergedAddons = [
      ...(packageJson.addons || []),
      ...(this.voltoConfigJS.addons || []),
    ];

    this.projectRootPath = projectRootPath;
    this.voltoPath =
      packageJson.name === '@plone/volto'
        ? `${projectRootPath}`
        : `${projectRootPath}/node_modules/@plone/volto`;
    this.addonNames = this.resultantMergedAddons.map((s) => s.split(':')[0]);
    this.packages = {};
    this.customizations = new Map();

    this.initDevelopmentPackages();
    this.initPublishedPackages();
    this.initAddonsFromEnvVar();

    this.dependencyGraph = buildDependencyGraph(
      this.resultantMergedAddons,
      (name) => {
        this.initPublishedPackage(name);
        return this.packages[name].addons || [];
      },
    );

    this.initRazzleExtenders();
  }

  /**
   * Use tsconfig.json or jsconfig.json to get paths for "development" packages/addons
   * (coming from mrs.developer.json)
   * Not all of these packages have to be Volto addons.
   */
  initDevelopmentPackages() {
    let configFile;
    if (fs.existsSync(`${this.projectRootPath}/tsconfig.json`))
      configFile = `${this.projectRootPath}/tsconfig.json`;
    else if (fs.existsSync(`${this.projectRootPath}/jsconfig.json`))
      configFile = `${this.projectRootPath}/jsconfig.json`;

    if (configFile) {
      const jsConfig = require(configFile).compilerOptions;
      const pathsConfig = jsConfig.paths;

      Object.keys(pathsConfig).forEach((name) => {
        if (!this.addonNames.includes(name)) this.addonNames.push(name);
        const packagePath = `${this.projectRootPath}/${jsConfig.baseUrl}/${pathsConfig[name][0]}`;
        const packageJsonPath = `${getPackageBasePath(
          packagePath,
        )}/package.json`;
        const pkg = {
          modulePath: packagePath,
          packageJson: packageJsonPath,
          version: require(packageJsonPath).version,
          isPublishedPackage: false,
          name,
          addons: require(packageJsonPath).addons || [],
        };

        this.packages[name] = Object.assign(this.packages[name] || {}, pkg);
      });
    }
  }

  /**
   * Add path to the "src" of npm-released packages. These packages can
   * release their source code in src, or transpile. The "main" of their
   * package.json needs to point to the module that exports `applyConfig` as
   * default.
   */
  initPublishedPackages() {
    this.addonNames.forEach(this.initPublishedPackage.bind(this));
  }

  initPublishedPackage(name) {
    if (!Object.keys(this.packages).includes(name)) {
      if (!this.addonNames.includes(name)) this.addonNames.push(name);
      const resolved = require.resolve(name, { paths: [this.projectRootPath] });
      const basePath = getPackageBasePath(resolved);
      const packageJson = path.join(basePath, 'package.json');
      const pkg = require(packageJson);
      const main = pkg.main || 'src/index.js';
      const modulePath = path.dirname(require.resolve(`${basePath}/${main}`));
      this.packages[name] = {
        name,
        version: pkg.version,
        isPublishedPackage: true,
        modulePath,
        packageJson,
        addons: pkg.addons || [],
      };
    }
  }

  initAddonsFromEnvVar() {
    if (process.env.ADDONS) {
      process.env.ADDONS.split(',').forEach(
        this.initAddonFromEnvVar.bind(this),
      );
    }
  }

  initAddonFromEnvVar(name) {
    // First lookup in the packages folder, local to the root (either vanilla Volto or project)
    const normalizedAddonName = name.split(':')[0];
    const testingPackagePath = `${this.projectRootPath}/packages/${normalizedAddonName}/src`;
    if (fs.existsSync(testingPackagePath)) {
      const basePath = getPackageBasePath(testingPackagePath);
      const packageJson = path.join(basePath, 'package.json');

      if (!this.addonNames.includes(normalizedAddonName))
        this.addonNames.push(normalizedAddonName);
      const pkg = {
        modulePath: testingPackagePath,
        version: require(packageJson).version,
        packageJson: packageJson,
        isPublishedPackage: false,
        name: normalizedAddonName,
        addons: require(packageJson).addons || [],
      };

      this.packages[normalizedAddonName] = Object.assign(
        this.packages[normalizedAddonName] || {},
        pkg,
      );
    } else {
      // Fallback in case the addon is released (not in packages folder nor in development, but in node_modules)
      this.initPublishedPackage(name);
    }
  }

  /**
   * Allow addons to provide razzle.config extenders. These extenders
   * modules (named razzle.extend.js) need to provide two functions:
   * `plugins(defaultPlugins) => plugins` and
   * `modify(...) => config`
   */
  initRazzleExtenders() {
    this.getAddons().forEach((addon) => {
      const base = path.dirname(addon.packageJson);
      const razzlePath = path.resolve(`${base}/razzle.extend.js`);
      if (fs.existsSync(razzlePath)) {
        addon.razzleExtender = razzlePath;
      }
    });
  }

  /**
   * Returns the addon records, respects order from package.json:addons
   */
  getAddons() {
    return this.dependencyGraph
      .dependenciesOf('@package')
      .map((name) => this.packages[name]);
  }

  getAddonExtenders() {
    return this.getAddons()
      .map((o) => o.razzleExtender)
      .filter((e) => e);
  }

  /**
   * Returns a mapping name:diskpath to be uses in webpack's resolve aliases
   */
  getResolveAliases() {
    const pairs = Object.keys(this.packages).map((o) => [
      o,
      this.packages[o].modulePath,
    ]);
    return fromEntries(pairs);
  }

  /**
   * Retrieves a mapping (to be used in resolve aliases) of module name to
   * filestype paths, to be used as customization paths.
   *
   * There are two styles of customizations: "classic style" and "addons style"
   *
   * In the classic style, the customization folders are only used to customize
   * Volto itself, so inside it we'll find a mirror of the Volto project
   * structure.
   *
   * In the "addons style" customization folder, we allow customization of
   * addons along with Volto customization, so we need separate folders. By
   * convention, we use a folder called "volto" inside customizations folder
   * and separate folder for each addon, identified by its addon (package) name.
   */
  getCustomizationPaths(packageJson, rootPath) {
    const aliases = {};
    let { customizationPaths } = packageJson;
    if (!customizationPaths) {
      customizationPaths = ['src/customizations'];
    }
    customizationPaths.forEach((customizationPath) => {
      customizationPath = customizationPath.endsWith('/')
        ? customizationPath.slice(0, customizationPath.length - 1)
        : customizationPath;
      const base = path.join(rootPath, customizationPath);
      const reg = [];

      // All registered addon packages (in tsconfig.json/jsconfig.json and package.json:addons)
      // can be customized
      Object.values(this.packages).forEach((addon) => {
        const { name, modulePath } = addon;
        if (fs.existsSync(path.join(base, name))) {
          reg.push({
            customPath: path.join(base, name),
            sourcePath: modulePath,
            name,
          });
        }
      });

      reg.push(
        fs.existsSync(path.join(base, 'volto'))
          ? {
              // new style (addons) customizations
              customPath: path.join(base, 'volto'),
              sourcePath: `${this.voltoPath}/src/`,
              name: '@plone/volto',
            }
          : {
              // old style, customizations directly in folder
              customPath: base,
              sourcePath: `${this.voltoPath}/src/`,
              name: '@plone/volto',
            },
      );

      reg.forEach(({ customPath, name, sourcePath }) => {
        map(
          glob(`${customPath}/**/*.*(svg|png|jpg|jpeg|gif|ico|less|js|jsx)`),
          (filename) => {
            const targetPath = filename.replace(customPath, sourcePath);
            if (fs.existsSync(targetPath)) {
              aliases[
                filename.replace(customPath, name).replace(/\.(js|jsx)$/, '')
              ] = path.resolve(filename);
            } else {
              debug(
                `The file ${filename} doesn't exist in the ${name} (${targetPath}), unable to customize.`,
              );
            }
          },
        );
      });
    });

    return aliases;
  }

  getProjectCustomizationPaths() {
    return this.getCustomizationPaths(this.packageJson, this.projectRootPath);
  }

  /**
   * Allow addons to customize Volto and other addons.
   *
   * We follow the same logic for overriding as the main `package.json:addons`.
   * First declared addon gets overridden by subsequent declared addons. That
   * means: customization in volto-addonA will potentially be rewritten by
   * customizations in volto-addonB if the declaration in package.json is like:
   * `addons:volto-addonA,volto-addonB`
   */
  getAddonCustomizationPaths() {
    let aliases = {};
    this.getAddons().forEach((addon) => {
      aliases = {
        ...aliases,
        ...this.getCustomizationPaths(
          require(addon.packageJson),
          getPackageBasePath(addon.modulePath),
        ),
      };
    });
    return aliases;
  }

  /**
   * Allow packages from addons set in env vars to customize Volto and other addons.
   *
   * Same as the above one, but specific for Volto addons coming from env vars
   */
  getAddonsFromEnvVarCustomizationPaths() {
    let aliases = {};
    if (process.env.ADDONS) {
      process.env.ADDONS.split(',').forEach((addon) => {
        const normalizedAddonName = addon.split(':')[0];
        const testingPackagePath = `${this.projectRootPath}/packages/${normalizedAddonName}/src`;
        if (fs.existsSync(testingPackagePath)) {
          const basePath = getPackageBasePath(testingPackagePath);
          const packageJson = path.join(basePath, 'package.json');
          aliases = {
            ...aliases,
            ...this.getCustomizationPaths(require(packageJson), basePath),
          };
        }
      });

      return aliases;
    } else {
      return [];
    }
  }

  /**
   * Returns an agregated, dependency-resolved list of addon loader strings
   */
  getAddonDependencies() {
    return getAddonsLoaderChain(this.dependencyGraph);
  }
}

module.exports = AddonConfigurationRegistry;
module.exports.getAddonsLoaderChain = getAddonsLoaderChain;
module.exports.buildDependencyGraph = buildDependencyGraph;
