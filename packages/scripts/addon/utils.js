import fs from 'fs';

export function amendPackageJSON(name, destination, isCanary) {
  const packageJSON = JSON.parse(
    fs.readFileSync(`${destination}/package.json`, 'utf8'),
  );
  packageJSON.scripts = {
    ...packageJSON.scripts,
    test: `RAZZLE_JEST_CONFIG=src/addons/${name}/jest-addon.config.js razzle test --passWithNoTests`,
    'cypress:open': `make test-acceptance-addon ADDONPATH=src/addons/${name}`,
    'cypress:run': `make test-acceptance-addon-headless ADDONPATH=src/addons/${name}`,
    'cypress:ci:full': `make full-test-acceptance-addon ADDONPATH=src/addons/${name}`,
  };
  fs.writeFileSync(
    `${destination}/package.json`,
    `${JSON.stringify(packageJSON, null, 2)}`,
  );
}

export function createMrsDeveloperConfig(config) {
  const template = { [config.name]: {} };
  const packageName = config.fullname || config.name;
  template[config.name].package = packageName;
  template[config.name].url = config.source;
  template[config.name].path = 'src';
  template[config.name].branch = config.branch || 'main';

  fs.writeFileSync(
    `${config.destination}/mrs.developer.json`,
    `${JSON.stringify(template, null, 2)}`,
  );
}

export function createLocalMrsDeveloperConfig(config) {
  const template = { [config.name]: {} };
  const packageName = config.fullname || config.name;
  template[config.name].package = packageName;
  template[config.name].local = `addons/${config.name}/src`;

  fs.writeFileSync(
    `${config.destination}/mrs.developer.json`,
    `${JSON.stringify(template, null, 2)}`,
  );
}
