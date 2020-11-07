// Extends the Volto test configuration by injecting the keys in `jest.config.js`
const path = require('path');
const fs = require('fs');
const projectRootPath = path.resolve('.');

module.exports = {
  modifyJestConfig({
    jestConfig: config,
    webpackObject,
    options: { razzleOptions, pluginOptions },
    paths,
  }) {
    if (fs.existsSync(`${projectRootPath}/jest.config.js`)) {
      const jestConfig = require(`${projectRootPath}/jest.config.js`);
      config = { ...config, ...jestConfig };
    }
    return config;
  },
};
