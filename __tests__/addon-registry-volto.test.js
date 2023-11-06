const path = require('path');
const AddonConfigurationRegistry = require('../packages/registry/addon-registry');

describe('AddonConfigurationRegistry - Volto', () => {
  it('works in Volto', () => {
    const base = path.join(__dirname, '..');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.projectRootPath).toStrictEqual(base);
    expect(reg.addonNames).toStrictEqual(['@plone/volto-slate']);
  });
});
