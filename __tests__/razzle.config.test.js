const path = require('path');
const utils = require('../razzle-config-utils.js');

describe('AddonConfigurationRegistry', () => {
  it("finds volto path as Volto's base folder", () => {
    const base = path.join(__dirname, '..');
    const reg = new utils.AddonConfigurationRegistry(base);
    expect(reg.registry.pkgPaths).toStrictEqual({ '@plone/volto': base });
  });

  it('finds volto path and addons in jsconfig', () => {
    const base = path.join(__dirname, 'fixtures', 'test-volto-project');
    const reg = new utils.AddonConfigurationRegistry(base);

    const voltoPath = `${base}/node_modules/@plone/volto`;
    const addonPath = `${base}/addons/test-addon/src`;
    const releasedAddonpath = `${base}/node_modules/test-released-addon/src`;

    expect(reg.registry.pkgPaths).toStrictEqual({
      '@plone/volto': voltoPath,
      'test-addon': addonPath,
      'test-released-addon': releasedAddonpath,
    });
  });
});
