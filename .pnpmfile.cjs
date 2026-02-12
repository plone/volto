/* eslint-disable */
const fs = require('fs');
const path = require('path');

const catalogPath = path.resolve(__dirname, 'catalog.json');
let catalog = {};
if (fs.existsSync(catalogPath)) {
  const catalogData = fs.readFileSync(catalogPath, 'utf-8');
  catalog = JSON.parse(catalogData);
} else {
  console.error('Catalog file does not exist at:', catalogPath);
}

module.exports = {
  hooks: {
    updateConfig(config) {
      if (config.catalogs) {
        config.catalogs.default ??= catalog;
      }
      return config;
    },
  },
};
