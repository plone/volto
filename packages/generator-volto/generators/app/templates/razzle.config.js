/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */
const fs = require('fs');

let voltoPath = './node_modules/@plone/volto';

let configFile;
if (fs.existsSync(`${this.projectRootPath}/tsconfig.json`))
  configFile = `${this.projectRootPath}/tsconfig.json`;
else if (fs.existsSync(`${this.projectRootPath}/jsconfig.json`))
  configFile = `${this.projectRootPath}/jsconfig.json`;

if (configFile) {
  const jsConfig = require(configFile).compilerOptions;
  const pathsConfig = jsConfig.paths;
  if (pathsConfig['@plone/volto'])
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig['@plone/volto'][0]}`;
}

module.exports = require(`${voltoPath}/razzle.config`);
