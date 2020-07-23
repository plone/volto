const path = require('path');
const AddonConfigurationRegistry = require('../addon-registry');

describe('AddonConfigurationRegistry', () => {
  it('works in Volto', () => {
    const base = path.join(__dirname, '..');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.projectRootPath).toStrictEqual(base);
    expect(reg.addonNames).toStrictEqual([]);
  });

  it('works in a mock project directory', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);

    const voltoPath = `${base}/node_modules/@plone/volto`;

    expect(reg.projectRootPath).toStrictEqual(base);
    expect(reg.voltoPath).toStrictEqual(voltoPath);

    expect(reg.addonNames).toStrictEqual([
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
    ]);

    expect(reg.packages).toEqual({
      'test-addon': {
        extraConfigLoaders: [],
        isAddon: false,
        modulePath: `${base}/addons/test-addon/src`,
        name: 'test-addon',
        packageJson: `${base}/addons/test-addon/package.json`,
      },
      'test-released-addon': {
        extraConfigLoaders: ['extra'],
        isAddon: true,
        modulePath: `${base}/node_modules/test-released-addon`,
        name: 'test-released-addon',
        packageJson: `${base}/node_modules/test-released-addon/package.json`,
        // serverConfig: `${base}/node_modules/test-released-addon/server.config.js`,
      },
      'test-released-source-addon': {
        extraConfigLoaders: [],
        isAddon: true,
        modulePath: `${base}/node_modules/test-released-source-addon/src`,
        name: 'test-released-source-addon',
        packageJson: `${base}/node_modules/test-released-source-addon/package.json`,
        razzleExtender: `${base}/node_modules/test-released-source-addon/razzle.extend.js`,
      },
    });
  });

  it('provides aliases for addons', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.getResolveAliases()).toStrictEqual({
      'test-addon': `${base}/addons/test-addon/src`,
      'test-released-addon': `${base}/node_modules/test-released-addon`,
      'test-released-source-addon': `${base}/node_modules/test-released-source-addon/src`,
    });
  });

  it('provides addon extenders', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.getAddonExtenders().length).toBe(1);
  });

  it('provides a list of addon records ordered by initial package declaration', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new AddonConfigurationRegistry(base);
    const addons = reg.getAddons();
    expect(addons.map((a) => a.name)).toStrictEqual([
      'test-addon',
      'test-released-addon',
      'test-released-source-addon',
    ]);
  });
});
