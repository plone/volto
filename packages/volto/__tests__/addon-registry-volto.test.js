const path = require('path');
const AddonConfigurationRegistry = require('../../registry/src/addon-registry');

describe('AddonConfigurationRegistry - Volto', () => {
  it('works in Volto', () => {
    const base = path.join(__dirname, '..');
    const reg = new AddonConfigurationRegistry(base);
    expect(reg.projectRootPath).toStrictEqual(base);
    // TODO: rename initPackagesFolder to proper name after the refactor
    // expect(reg.addonNames).toStrictEqual(['@plone/volto-slate']);
    expect(reg.packages['@plone/volto-slate'].name).toStrictEqual(
      '@plone/volto-slate',
    );
  });
});
