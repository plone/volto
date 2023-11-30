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
    // If the RAZZLE_JEST_CONFIG env var exists, use it as the file with the Jest config
    // overrides
    if (process.env.RAZZLE_JEST_CONFIG) {
      if (
        fs.existsSync(`${projectRootPath}/${process.env.RAZZLE_JEST_CONFIG}`)
      ) {
        const jestConfig = require(
          `${projectRootPath}/${process.env.RAZZLE_JEST_CONFIG}`,
        );
        config = { ...config, ...jestConfig };
      }
      // if not, use the sensible default, `jest.config.js`
    } else {
      if (fs.existsSync(`${projectRootPath}/jest.config.js`)) {
        const jestConfig = require(`${projectRootPath}/jest.config.js`);
        config = { ...config, ...jestConfig };
      }
    }
    return config;
  },
};
