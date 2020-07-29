const glob = require('glob').sync;
const path = require('path');
const fs = require('fs');

const { map } = require('lodash');

// Addon specification:
// - name
// - isAddon
// - modulePath
// - packageJson
// - packageContent (customizable files)
// - extraConfigLoaders (function references)
// - razzleExtender ({plugins, modify})

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

class AddonConfigurationRegistry {
  constructor(projectRootPath) {
    const packageJson = (this.packageJson = require(path.join(
      projectRootPath,
      'package.json',
    )));

    this.projectRootPath = projectRootPath;
    this.voltoPath =
      packageJson.name === '@plone/volto'
        ? `${projectRootPath}`
        : `${projectRootPath}/node_modules/@plone/volto`;
    this.addonNames = (packageJson.addons || []).map((s) => s.split(':')[0]);
    this.packages = {};
    this.customizations = new Map();

    this.initDevelopmentPackages();
    this.initPublishedPackages();

    this.initRazzleExtenders();
    this.initAddonLoaders();
  }

  /*
   * Use jsconfig.js to get paths for "development" packages/addons (coming from mrs.developer.json)
   */
  initDevelopmentPackages() {
    if (fs.existsSync(`${this.projectRootPath}/jsconfig.json`)) {
      const jsConfig = require(`${this.projectRootPath}/jsconfig`)
        .compilerOptions;
      const pathsConfig = jsConfig.paths;

      Object.keys(pathsConfig).forEach((name) => {
        const packagePath = `${this.projectRootPath}/${jsConfig.baseUrl}/${pathsConfig[name][0]}`;
        const pkg = {
          modulePath: packagePath,
          packageJson: `${getPackageBasePath(packagePath)}/package.json`,
          isAddon: false,
          name,
        };

        this.packages[name] = Object.assign(this.packages[name] || {}, pkg);
      });
    }
  }

  /*
   * Add path to the "src" of npm-released packages. These packages can
   * release their source code in src, or transpile. The "main" of their
   * package.json needs to point to the module that exports `applyConfig` as
   * default.
   */
  initPublishedPackages() {
    this.addonNames.forEach((name) => {
      if (!(name in this.packages)) {
        const basePath = `${this.projectRootPath}/node_modules/${name}`;
        const packageJson = `${basePath}/package.json`;
        const pkg = require(packageJson);
        const main = pkg.main || 'src/index.js';
        const modulePath = path.dirname(require.resolve(`${basePath}/${main}`));
        this.packages[name] = {
          name,
          isAddon: true,
          modulePath,
          packageJson,
        };
      }
    });
  }

  /*
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

  /*
   * Maps extra configuration loaders for addons:
   * - extra loaders (from the addon loader string in package.addons
   */
  initAddonLoaders() {
    (this.packageJson.addons || []).forEach((addonConfigString) => {
      let extras = [];
      const addonConfigLoadInfo = addonConfigString.split(':');
      const pkgName = addonConfigLoadInfo[0];
      if (addonConfigLoadInfo.length > 1) {
        extras = addonConfigLoadInfo[1].split(',');
      }

      const addon = this.packages[pkgName];
      addon.extraConfigLoaders = extras;
    });
  }

  /*
   * Returns the addon records, respects order from package.json:addons
   */
  getAddons() {
    return (this.packageJson.addons || []).map(
      (s) => this.packages[s.split(':')[0]],
    );
  }

  getAddonExtenders() {
    return this.getAddons()
      .map((o) => o.razzleExtender)
      .filter((e) => e);
  }

  /*
   * Returns a mapping name:diskpath to be uses in webpack's resolve aliases
   */
  getResolveAliases() {
    const pairs = Object.keys(this.packages).map((o) => [
      o,
      this.packages[o].modulePath,
    ]);
    return fromEntries(pairs);
  }

  /*
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
   *
   */
  getCustomizationPaths() {
    const customizations = {};
    let { customizationPaths } = this.packageJson;
    if (!customizationPaths) {
      customizationPaths = ['src/customizations'];
    }
    customizationPaths.forEach((customizationPath) => {
      const base = path.join(this.projectRootPath, customizationPath);
      const reg = [];

      // Addon customization, goes first
      Object.values(this.packages).forEach((addon) => {
        const { name, modulePath } = addon;
        if (fs.existsSync(path.join(base, name))) {
          reg.push({
            basePath: path.join(base, name),
            sourcePath: modulePath,
            name,
          });
        }
      });

      reg.push(
        fs.existsSync(path.join(base, 'volto'))
          ? {
              // new style (addons) customizations
              basePath: path.join(base, 'volto'),
              sourcePath: `${this.voltoPath}/src/`,
              name: '@plone/volto',
            }
          : {
              // old style, customizations directly in folder
              basePath: base,
              sourcePath: `${this.voltoPath}/src/`,
              name: '@plone/volto',
            },
      );

      reg.forEach(({ basePath, name, sourcePath }) => {
        map(
          glob(`${basePath}**/*.*(svg|png|jpg|jpeg|gif|ico|less|js|jsx)`),
          (filename) => {
            const targetPath = filename.replace(basePath, sourcePath);
            if (fs.existsSync(targetPath)) {
              customizations[
                filename.replace(basePath, name).replace(/\.(js|jsx)$/, '')
              ] = path.resolve(filename);
            } else {
              console.log(
                `The file ${filename} doesn't exist in the ${name} (${targetPath}), unable to customize.`,
              );
            }
          },
        );
      });
    });

    return customizations;
  }

  getAddonCustomizationPaths() {
    return {};
  }
}

module.exports = AddonConfigurationRegistry;
