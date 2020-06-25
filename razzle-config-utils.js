const path = require('path');
const fs = require('fs');

// Addon specification:
// - name
// - isAddon
// - modulePath
// - packageJson
// - packageContent (customizable files)
// - extraConfigLoaders (function references)
// - razzleExtender ({plugins, modify})
// - serverConfig (function reference)

function getPackageBasePath(base) {
  while (!fs.existsSync(`${base}/package.json`)) {
    base = path.join(base, '../');
  }
  return path.resolve(base);
}

class AddonConfigurationRegistry {
  constructor(projectRootPath) {
    const packageJson = (this.packageJson = require(path.join(
      projectRootPath,
      'package.json',
    )));

    this.registry = {
      projectRootPath: projectRootPath,
      projectPackageJson: packageJson,
      voltoPath:
        packageJson.name === '@plone/volto'
          ? `${projectRootPath}`
          : `${projectRootPath}/node_modules/@plone/volto`,

      packages: {},
    };

    this.initDevelopmentPackages();
    this.initPublishedPackages();

    this.initRazzleExtenders();
    this.initConfigLoaders();
  }

  /*
   * Use jsconfig.js to get paths for "development" addons (coming from
   * mrs.developer.json)
   */
  initDevelopmentPackages() {
    if (fs.existsSync(`${this.registry.projectRootPath}/jsconfig.json`)) {
      const jsConfig = require(`${this.registry.projectRootPath}/jsconfig`)
        .compilerOptions;
      const pathsConfig = jsConfig.paths;

      Object.keys(pathsConfig).forEach((name) => {
        const packagePath = `${this.registry.projectRootPath}/${jsConfig.baseUrl}/${pathsConfig[name][0]}`;
        const pkg = {
          modulePath: packagePath,
          packageJson: `${getPackageBasePath(packagePath)}/package.json`,
          isAddon: false,
        };

        this.registry.packages[name] = Object.assign(
          this.registry.packages[name] || {},
          pkg,
        );
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
    (this.packageJson.addons || []).forEach((addon) => {
      const addonName = addon.split(':')[0];
      if (!(addonName in this.registry.packages)) {
        const basePath = `${this.registry.projectRootPath}/node_modules/${addonName}`;
        const packageJson = `${basePath}/package.json`;
        const pkg = require(packageJson);
        const main = pkg.main || 'src/index.js';
        const modulePath = path.basepath(
          require.resolve(`${basePath}/${main}`),
        );
        this.registry.packages[addonName] = {
          isAddon: true,
          modulePath,
          packageJson,
        };
      }
    });
  }

  getAddons() {
    return this.registry.packages
      .filter((o) => o.isAddon && o.name !== '@plone/volto')
      .map((name) => this.registry.packages[name]);
  }

  /*
   * Allow addons to provide razzle.config extenders. These extenders
   * modules need to provide two functions:
   * `plugins(defaultPlugins) => plugins` and
   * `modify(...) => config`
   */
  initRazzleExtenders() {
    this.getAddons().forEach((addon) => {
      const base = path.basepath(addon.packageJson);
      const razzlePath = path.resolve(`${base}/razzle.extend.js`);
      if (fs.existsSync(razzlePath)) {
        addon.razzleExtender = require(razzlePath);
      }
    });
  }

  initAddonLoaders() {
    (this.packageJson.addons || []).forEach((addonConfigString) => {
      let extras = [];
      const addonConfigLoadInfo = addonConfigString.split(':');
      const pkgName = addonConfigLoadInfo[0];
      if (addonConfigLoadInfo.length > 1) {
        extras = addonConfigLoadInfo[1].split(',');
      }

      const addon = this.registry[pkgName];
      addon.extraConfigLoaders = extras;

      const serverModule = path.resolve(`${addon.modulePath}/server.config.js`);
      if (fs.existsSync(serverModule)) {
        addon.serverConfig = serverModule;
      }
    });
  }
}

module.exports = { AddonConfigurationRegistry };

// pkgPaths: {
//   '@plone/volto':
//     packageJson.name === '@plone/volto'
//       ? `${projectRootPath}`
//       : `${projectRootPath}/node_modules/@plone/volto`,
// },
// addons: packageJson.addons || [],
// addonsPkgJson: {}, // addonName => addonPackageJsonPath
//
// // addonLoaders: [],
// addonExtenders: [],
//
// serverExtenders: [],
// customizations: new Map(),
// this.addPkgPaths();
// this.addAddonPaths();
// // this.addAddonLoaders();
// this.addAddonExtenders();
