import path from 'path';
import { AddonRegistry } from '../src/addon-registry/addon-registry';
import { describe, it, expect } from 'vitest';

describe('AddonRegistry - get()', () => {
  it.only('Basic information', () => {
    const base = path.join(import.meta.dirname, 'fixtures', 'test-app');
    const { addons, shadowAliases, theme } = AddonRegistry.init(base);
    expect(addons).toStrictEqual(['@plone/slots', 'my-addon']);
    expect(shadowAliases).toStrictEqual([
      {
        find: '@plone/slots/components/Logo/Logo.svg',
        replacement: `${base}/node_modules/my-addon/customizations/@plone/slots/components/Logo/Logo.svg`,
      },
    ]);
    expect(theme).toStrictEqual(undefined);
  });
});
