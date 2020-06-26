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

    const voltoPath = `${base}/node_modules/@plone/volto`;

    expect(reg.registry.projectRootPath).toStrictEqual(base);
    expect(reg.registry.voltoPath).toStrictEqual(voltoPath);

    expect(reg.registry.packages).toEqual({
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
        serverConfig: `${base}/node_modules/test-released-addon/server.config.js`,
      },
      'test-released-source-addon': {
        extraConfigLoaders: [],
        isAddon: true,
        modulePath: `${base}/node_modules/test-released-source-addon/src`,
        packageJson: `${base}/node_modules/test-released-source-addon/package.json`,
        razzleExtender: Object(),
      },
    });
  });
});
