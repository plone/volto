// let voltoPath = `${projectRootPath}`;
// if (packageJson.name !== '@plone/volto') {
//   voltoPath = `${projectRootPath}/node_modules/@plone/volto`;
// }

/*
 * Find the best Volto path from the environment
 */

// What is a Volto addon?
// Unlike any other JS package, it's a package that can customize Volto.
// Usually Volto addons are loaded from mrs.developer configuration, but that's
// not strictly required. If packaged as NPM packages, they should ship with
// their intact source code in the "src" folder, as that is required by Volto
// aliasing and customizations mechanism.
//
// TODO: use package.main = src/index.js to distinguish on transpiled packages.

// // Get the real disk path for all development packages (Volto addons)
// const jsconfigPaths = {};
// if (fs.existsSync(`${projectRootPath}/jsconfig.json`)) {
//   const jsConfig = require(`${projectRootPath}/jsconfig`).compilerOptions;
//   const pathsConfig = jsConfig.paths;
//   Object.keys(pathsConfig).forEach((packageName) => {
//     const packagePath = `${projectRootPath}/${jsConfig.baseUrl}/${pathsConfig[packageName][0]}`;
//     jsconfigPaths[packageName] = packagePath;
//     if (packageName === '@plone/volto') {
//       voltoPath = packagePath;
//     }
//   });
// }
//
// // For npm released addons, treat them as development by aliasing their 'src'
// // folder
// const addonAliases = {};
// const addons = packageJson.addons || [];
//
// addons.forEach((addon) => {
//   const addonName = addon.split(':')[0];
//   if (!(addonName in jsconfigPaths)) {
//     const addonPath = `${projectRootPath}/node_modules/${addonName}/src`;
//     addonAliases[addonName] = addonPath;
//   }
// });
//
// // Now we have:
// //  - development addons in jsconfigPath
// //  - npm released addons in addonAliases
// const addonPaths = {
//   ...jsconfigPaths,
//   ...addonAliases,
// };
//
const pkgRegistry = require('./razzle-config-utils').PackageRegistry(
  projectRootPath,
);

// const addonExtenders = [];

