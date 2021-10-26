/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

const tsConfig = require('./tsconfig').compilerOptions;

const pathsConfig = tsConfig.paths;
let voltoPath = './node_modules/@plone/volto';
Object.keys(pathsConfig).forEach(pkg => {
  if (pkg === '@plone/volto') {
    voltoPath = `./${tsConfig.baseUrl}/${pathsConfig[pkg][0]}`;
  }
});

module.exports = require(`${voltoPath}/razzle.config`);
