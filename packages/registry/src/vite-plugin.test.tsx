import React from 'react';
import { describe, expect, it } from 'vitest';
import { relativeToAbsoluteImportPlugin } from '../vite-plugin';

describe('relativeToAbsoluteImportPlugin', () => {
  let plugin: any;

  const packages = {
    '@plone/slots': {
      name: '@plone/slots',
      version: '1.0.0-alpha.1',
      isPublishedPackage: true,
      isRegisteredAddon: true,
      modulePath: '/Development/plone/seven-add-on/core/packages/slots',
      packageJson:
        '/Development/plone/seven-add-on/core/packages/slots/package.json',
      basePath: '/Development/plone/seven-add-on/core/packages/slots',
      addons: [],
    },
  };

  it('should have a name property', () => {
    plugin = relativeToAbsoluteImportPlugin({ packages });
    expect(plugin.name).toBe('relative-to-absolute-imports');
  });

  it('should handle: `./`', async () => {
    plugin = relativeToAbsoluteImportPlugin({ packages });
    const code = `import something from './module';`;
    const id = '/Development/plone/seven-add-on/core/packages/slots/index.ts';
    const result = await plugin.transform(code, id);

    expect(result.code).toContain(
      `import something from '@plone/slots/module';`,
    );
  });

  it('should handle: `../`', async () => {
    plugin = relativeToAbsoluteImportPlugin({ packages });
    const code = `import something from '../config';`;
    const id =
      '/Development/plone/seven-add-on/core/packages/slots/components/App.tsx';
    const result = await plugin.transform(code, id);

    expect(result.code).toContain(
      `import something from '@plone/slots/config';`,
    );
  });

  it('should handle: `.`', async () => {
    plugin = relativeToAbsoluteImportPlugin({ packages });
    const code = `import something from '.';`;
    const id =
      '/Development/plone/seven-add-on/core/packages/slots/components/App.tsx';
    const result = await plugin.transform(code, id);

    expect(result.code).toContain(
      `import something from '@plone/slots/components';`,
    );
  });

  it('should handle: `..`', async () => {
    plugin = relativeToAbsoluteImportPlugin({ packages });
    const code = `import something from '..';`;
    const id =
      '/Development/plone/seven-add-on/core/packages/slots/components/App.tsx';
    const result = await plugin.transform(code, id);

    expect(result.code).toContain(`import something from '@plone/slots/';`);
  });

  it('should not transform absolute imports', () => {
    const code = `import something from '@plone/types';`;
    const id = '/Development/plone/seven-add-on/core/packages/slots/index.ts';
    const result = plugin.transform(code, id);

    expect(result.code).toBeUndefined();
  });
});
