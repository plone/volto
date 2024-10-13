const fs = require('fs');
const projectRootPath = __dirname;
const AddonConfigurationRegistry =
  require('@plone/registry/addon-registry').default;

let voltoPath = './node_modules/@plone/volto';

let configFile;
if (fs.existsSync(`${projectRootPath}/tsconfig.json`))
  configFile = `${projectRootPath}/tsconfig.json`;
else if (fs.existsSync(`${projectRootPath}/jsconfig.json`))
  configFile = `${projectRootPath}/jsconfig.json`;

if (configFile) {
  const jsConfig = require(configFile).compilerOptions;
  const pathsConfig = jsConfig.paths;
  if (pathsConfig['@plone/volto'])
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig['@plone/volto'][0]}`;
}

const reg = new AddonConfigurationRegistry(__dirname);

// Extends ESlint configuration for adding the aliases to `src` directories in Volto addons
const addonAliases = Object.keys(reg.packages).map((o) => [
  o,
  reg.packages[o].modulePath,
]);

const addonExtenders = reg.getEslintExtenders().map((m) => require(m));

const defaultConfig = {
  extends: `${voltoPath}/.eslintrc`,
  ignorePatterns: [
    // '.storybook/**/*',
    'src/addons/**/node_modules',
    'src/addons/**/cypress',
    'src/addons/**/build',
    '!src/addons/volto-volto-project',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@plone/volto', '@plone/volto/src'],
          ['@plone/volto-slate', '@plone/volto-slate/src'],
          ...addonAliases,
          ['@root', `${__dirname}/src`],
          ['~', `${__dirname}/src`],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
};

const config = addonExtenders.reduce(
  (acc, extender) => extender.modify(acc),
  defaultConfig,
);

module.exports = config;
