import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Get Registry', () => {
  test('Successful', async () => {
    const registryName = 'plone.app.querystring.field.path.title';
    const result = await cli.getRegistryRecord({ registryName });

    expect(result.data).toBe('Location');
  });

  test('Failure', async () => {
    const registryName = '/blah';

    try {
      await cli.getRegistryRecord({ registryName });
    } catch (err) {
      expect((err as RequestError).status).toBe(503);
    }
  });
});
