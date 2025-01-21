import path from 'path';
import { AddonRegistry } from '@plone/registry/addon-registry';
import { describe, expect, it } from 'vitest';

describe('AddonRegistry - Volto', () => {
  it('works in Volto', () => {
    const base = path.join(__dirname, '..');
    const { registry } = AddonRegistry.init(base);
    expect(registry.projectRootPath).toStrictEqual(base);
    // TODO: rename initPackagesFolder to proper name after the refactor
    // expect(registry.addonNames).toStrictEqual(['@plone/volto-slate']);
    expect(registry.packages['@plone/volto-slate'].name).toStrictEqual(
      '@plone/volto-slate',
    );
  });
});
