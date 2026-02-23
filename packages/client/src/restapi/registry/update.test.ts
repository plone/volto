import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import type { RequestError } from '../types';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Update Registry', () => {
  test('Successful', async () => {
    const updateRegistryData = {
      'plone.app.querystring.field.path.title': 'Value',
    };

    const result = await cli.updateRegistry({
      data: updateRegistryData,
    });

    const registry = await cli.getRegistryRecord({
      registryName: 'plone.app.querystring.field.path.title',
    });

    expect(registry.data).toBe('Value');
  });

  test('Failure', async () => {
    const updateRegistryData = {
      blah: 'Value',
    };

    try {
      await cli.updateRegistry({
        data: updateRegistryData,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(500);
    }
  });
});
