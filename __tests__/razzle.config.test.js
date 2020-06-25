const path = require('path');
const utils = require('../razzle-config-utils.js');

describe('AddonConfigurationRegistry', () => {
  it('works in Volto', () => {
    const base = path.join(__dirname, '..');
    const reg = new utils.AddonConfigurationRegistry(base);
    expect(reg.registry.projectRootPath).toStrictEqual(base);
  });

  it('works in a mock project directory', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new utils.AddonConfigurationRegistry(base);

    // const voltoPath = `${base}/node_modules/@plone/volto`;
    // const addonPath = `${base}/addons/test-addon/src`;
    // const releasedAddonpath = `${base}/node_modules/test-released-addon/src`;

    expect(reg.registry.packages).toStrictEqual({
      'test-addon': {
        extraConfigLoaders: [],
        isAddon: false,
        modulePath: `${base}/addons/test-addon/src`,
        packageJson: `${base}/addons/test-addon/package.json`,
      },
      'test-released-addon': {
        extraConfigLoaders: ['extra'],
        isAddon: true,
        modulePath: `${base}/node_modules/test-released-addon`,
        packageJson: `${base}/node_modules/test-released-addon/package.json`,
      },
      'test-released-source-addon': {
        extraConfigLoaders: [],
        isAddon: true,
        modulePath: `${base}/node_modules/test-released-source-addon/src`,
        packageJson: `${base}/node_modules/test-released-source-addon/package.json`,
      },
    });
  });
});
