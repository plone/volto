/* eslint no-console: 0 */
const glob = require('glob').sync;
const path = require('path');
const fs = require('fs');
const debug = require('debug')('shadowing');
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
  graph.addNode('@root');

  const seen = ['@root'];
  const stack = [['@root', addons]];

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
  return graph.dependenciesOf('@root').map((name) => {
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
    const packageJson = (this.packageJson = require(
      path.join(projectRootPath, 'package.json'),
    ));
    this.voltoConfigJS = {};
    // Loads the dynamic config, if any
    if (process.env.VOLTOCONFIG) {
      if (fs.existsSync(path.resolve(process.env.VOLTOCONFIG))) {
        const voltoConfigPath = path.resolve(process.env.VOLTOCONFIG);
        console.log(`Using volto.config.js in: ${voltoConfigPath}`);
        this.voltoConfigJS = require(voltoConfigPath);
      }
    } else if (fs.existsSync(path.join(projectRootPath, 'volto.config.js'))) {
      this.voltoConfigJS = require(
        path.join(projectRootPath, 'volto.config.js'),
      );
    } else {
      this.voltoConfigJS = {};
    }

    this.projectRootPath = projectRootPath;
    this.isVoltoProject = packageJson.name !== '@plone/volto';
    this.voltoPath =
      packageJson.name === '@plone/volto'
        ? `${projectRootPath}`
        : `${projectRootPath}/node_modules/@plone/volto`;

    this.coreAddons =
      packageJson.name === '@plone/volto'
        ? packageJson.coreAddons || {}
        : require(`${getPackageBasePath(this.voltoPath)}/package.json`)
            .coreAddons || {};

    this.resultantMergedAddons = [
      ...(packageJson.addons || []),
      ...(this.voltoConfigJS.addons || []),
    ];

    this.addonNames = this.resultantMergedAddons.map((s) => s.split(':')[0]);
    this.packages = {};
    this.customizations = new Map();

    // Theme from an ENV VAR, from volto.config.js or from a package.json key
    // in this order of preference
    this.theme =
      process.env.THEME || this.voltoConfigJS.theme || packageJson.theme;

    this.initDevelopmentPackages();
    this.initPublishedPackages();
    this.initAddonsFromEnvVar();

    this.dependencyGraph = buildDependencyGraph(
      [
        ...(Object.keys(this.coreAddons).map(
          (key) => this.coreAddons[key].package,
        ) || []),
        ...this.resultantMergedAddons,
        ...(process.env.ADDONS ? process.env.ADDONS.split(';') : []),
      ],
      (name) => {
        this.initPublishedPackage(name);
        return this.packages[name].addons || [];
      },
    );

    this.initAddonExtenders();
  }

  /**
   * Gets the `tsconfig.json` `compilerOptions.baseUrl` and `compilerOptions.paths`
   * Returns a tuple `[baseUrl, pathsConfig]`
   *
   */
  getTSConfigPaths(rootPath = this.projectRootPath) {
    let configFile;
    if (fs.existsSync(`${rootPath}/tsconfig.json`))
      configFile = `${rootPath}/tsconfig.json`;
    else if (fs.existsSync(`${rootPath}/jsconfig.json`))
      configFile = `${rootPath}/jsconfig.json`;

    let pathsConfig;
    let baseUrl;
    if (configFile) {
      const jsConfig = require(configFile).compilerOptions;
      pathsConfig = jsConfig.paths;
      baseUrl = jsConfig.baseUrl;
    }

    return [baseUrl, pathsConfig];
  }

  /**
   * Volto is able to register packages while in development thanks to
   * `mrs-developer`. It uses the JS/TS environment config `compilerOptions.paths`
   * to resolve them through the system.
   */
  initDevelopmentPackages() {
    const [, pathsConfig] = this.getTSConfigPaths();
    if (pathsConfig) {
      // We only initialize the development addons present in `compilerOptions.paths`
      // configured by `mrs-developer` filtered by the add-ons registered (via config)
      // since we can have other paths there that are not addons
      const developmentAddons = this.addonNames.filter((key) =>
        pathsConfig.hasOwnProperty(key),
      );

      developmentAddons.forEach((name) => {
        this.initDevelopmentPackage(name);
      });
    }
  }

  /**
   * Given an add-on name, it registers it as a development package
   *
   */
  initDevelopmentPackage(name) {
    const [baseUrl, pathsConfig] = this.getTSConfigPaths();
    const packagePath = `${this.projectRootPath}/${baseUrl}/${pathsConfig[name][0]}`;
    const packageJsonPath = `${getPackageBasePath(packagePath)}/package.json`;
    const innerAddons = require(packageJsonPath).addons || [];
    const innerAddonsNormalized = innerAddons.map((s) => s.split(':')[0]);
    if (this.addonNames.includes(name) && innerAddonsNormalized.length > 0) {
      innerAddonsNormalized.forEach((name) => {
        if (!this.addonNames.includes(name)) this.addonNames.push(name);
      });
    }
    const pkg = {
      modulePath: packagePath,
      packageJson: packageJsonPath,
      version: require(packageJsonPath).version,
      isPublishedPackage: false,
      isRegisteredAddon: this.addonNames.includes(name),
      name,
      addons: require(packageJsonPath).addons || [],
    };

    this.packages[name] = Object.assign(this.packages[name] || {}, pkg);
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
    // I am in the paths list, if so, register it as a development package
    // instead than a published one
    const [, pathsConfig] = this.getTSConfigPaths();
    if (pathsConfig.hasOwnProperty(name)) {
      return this.initDevelopmentPackage(name);
    }

    if (!Object.keys(this.packages).includes(name)) {
      const resolved = require.resolve(name, { paths: [this.projectRootPath] });
      const basePath = getPackageBasePath(resolved);
      const packageJson = path.join(basePath, 'package.json');
      const pkg = require(packageJson);
      const main = pkg.main || 'src/index.js';
      const modulePath = path.dirname(require.resolve(`${basePath}/${main}`));
      const innerAddons = pkg.addons || [];
      const innerAddonsNormalized = innerAddons.map((s) => s.split(':')[0]);
      if (this.addonNames.includes(name) && innerAddonsNormalized.length > 0) {
        innerAddonsNormalized.forEach((name) => {
          if (!this.addonNames.includes(name)) this.addonNames.push(name);
        });
      }
      const packageTSConfig = this.getTSConfigPaths(basePath);

      this.packages[name] = {
        name,
        version: pkg.version,
        isPublishedPackage: true,
        isRegisteredAddon: this.addonNames.includes(name),
        modulePath,
        packageJson,
        basePath,
        tsConfigPaths: packageTSConfig[1] ? packageTSConfig : null,
        addons: pkg.addons || [],
      };
    }
  }

  initAddonsFromEnvVar() {
    if (process.env.ADDONS) {
      process.env.ADDONS.split(';').forEach(
        this.initAddonFromEnvVar.bind(this),
      );
    }
  }

  // An add-on from the ADDONS env var can only be a published one
  initAddonFromEnvVar(name) {
    const normalizedAddonName = name.split(':')[0];
    this.initPublishedPackage(normalizedAddonName);
  }

  /**
   * Allow addons to provide various extenders.
   *
   * The razzle.extend.js modules (named razzle.extend.js) needs to provide
   * two functions:
   * `plugins(defaultPlugins) => plugins` and
   * `modify(...) => config`
   *
   * The eslint.extend.js
   */
  initAddonExtenders() {
    this.getAddons().forEach((addon) => {
      const base = path.dirname(addon.packageJson);
      const razzlePath = path.resolve(`${base}/razzle.extend.js`);
      if (fs.existsSync(razzlePath)) {
        addon.razzleExtender = razzlePath;
      }
      const eslintPath = path.resolve(`${base}/eslint.extend.js`);
      if (fs.existsSync(eslintPath)) {
        addon.eslintExtender = eslintPath;
      }
    });
  }

  /**
   * Returns the addon records, respects order from package.json:addons
   */
  getAddons() {
    return this.dependencyGraph
      .dependenciesOf('@root')
      .map((name) => this.packages[name]);
  }

  getAddonExtenders() {
    return this.getAddons()
      .map((o) => o.razzleExtender)
      .filter((e) => e);
  }

  getEslintExtenders() {
    return this.getAddons()
      .map((o) => o.eslintExtender)
      .filter((e) => e);
  }

  getCustomThemeAddons() {
    const customThemeAddonsInfo = {
      variables: [],
      main: [],
    };

    this.getAddonDependencies().forEach((addon) => {
      const normalizedAddonName = addon.split(':')[0];
      // We have two possible insertion points, variables and main

      const customThemeVariables = `${this.packages[normalizedAddonName].modulePath}/theme/_variables.scss`;
      const customThemeMain = `${this.packages[normalizedAddonName].modulePath}/theme/_main.scss`;
      if (
        fs.existsSync(customThemeVariables) &&
        normalizedAddonName !== this.theme
      ) {
        customThemeAddonsInfo.variables.push(normalizedAddonName);
      }
      if (
        fs.existsSync(customThemeMain) &&
        normalizedAddonName !== this.theme
      ) {
        customThemeAddonsInfo.main.push(normalizedAddonName);
      }
    });

    return customThemeAddonsInfo;
  }

  /**
   * Returns a list of aliases given the defined paths in `tsconfig.json`
   */
  getAliasesFromTSConfig(basePath, tsConfig) {
    const [baseUrl, options] = tsConfig;
    const fullPathsPath = baseUrl ? `${basePath}/${baseUrl}` : basePath;

    let aliases = {};
    Object.keys(options || {}).forEach((item) => {
      const name = item.replace(/\/\*$/, '');
      // webpack5 allows arrays here, fix later
      const value = path.resolve(
        fullPathsPath,
        options[item][0].replace(/\/\*$/, ''),
      );

      aliases[name] = value;
    });

    return aliases;
  }

  /**
   * Returns a mapping name:diskpath to be uses in webpack's resolve aliases.
   * It includes all registered add-ons and their `src` paths, and also the paths
   * defined in the `tsconfig.json` files of the add-ons.
   */
  getResolveAliases() {
    const pairs = [
      ...Object.keys(this.packages).map((o) => [
        o,
        this.packages[o].modulePath,
      ]),
    ];

    let aliasesFromTSPaths = {};
    Object.keys(this.packages).forEach((o) => {
      if (this.packages[o].tsConfigPaths) {
        aliasesFromTSPaths = {
          ...aliasesFromTSPaths,
          ...this.getAliasesFromTSConfig(
            this.packages[o].basePath,
            this.packages[o].tsConfigPaths,
          ),
        };
      }
    });

    return { ...fromEntries(pairs), ...aliasesFromTSPaths };
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

      // allow customization of modules in the `@root` namespace from addons,
      // by creating a folder called `@root`.
      const rootBase = path.join(base, '@root');
      if (fs.existsSync(rootBase))
        reg.push({
          customPath: rootBase,
          sourcePath: `${this.projectRootPath}/src`,
          name: '@root',
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
        glob(
          `${customPath}/**/*.*(svg|png|jpg|jpeg|gif|ico|less|js|jsx|ts|tsx)`,
        ).map((filename) => {
          function changeFileExtension(filePath) {
            // Extract the current file extension
            const currentExtension = filePath.split('.').pop();

            // Define the mapping between file extensions
            const extensionMapping = {
              jsx: 'tsx',
              tsx: 'jsx',
              js: 'ts',
              ts: 'js',
            };

            // Check if the current extension is in the mapping
            if (currentExtension in extensionMapping) {
              // Replace the current extension with the corresponding one from the mapping
              const newExtension = extensionMapping[currentExtension];
              const newPath = filePath.replace(
                `.${currentExtension}`,
                `.${newExtension}`,
              );
              return newPath;
            } else {
              // If the current extension is not in the mapping, return the original path
              return filePath;
            }
          }

          const targetPath = filename.replace(customPath, sourcePath);
          // We try to find the source to shadow with the exact path
          // and we try also with the extension changed in search for JS<->TS
          // correspondence
          if (
            fs.existsSync(targetPath) ||
            fs.existsSync(changeFileExtension(targetPath))
          ) {
            aliases[
              filename
                .replace(customPath, name)
                .replace(/\.(js|jsx|ts|tsx)$/, '')
            ] = path.resolve(filename);
          } else {
            debug(
              `The file ${filename} doesn't exist in the ${name} (${targetPath}), unable to customize.`,
            );
          }
        });
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
      process.env.ADDONS.split(';').forEach((addon) => {
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

  getDotDependencyGraph() {
    const seen = new Set();
    let out = `digraph {
  layout="fdp"
  beautify=true
  sep="+10"
  splines=curved

  "@root" [color = red fillcolor=yellow style=filled]
`;
    let queue = ['@root'];
    let name;

    while (queue.length > 0) {
      name = queue.pop();

      const deps = this.dependencyGraph.directDependenciesOf(name);
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];

        if (!seen.has(dep)) {
          seen.add(dep);
          queue.push(dep);
        }
        out += `    "${name}" -> "${dep}"\n`;
      }
    }
    out += '}';
    return out;
  }
}

module.exports = AddonConfigurationRegistry;
module.exports.getAddonsLoaderChain = getAddonsLoaderChain;
module.exports.buildDependencyGraph = buildDependencyGraph;
