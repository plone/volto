import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, test, expect } from 'vitest';
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

describe('Get Addon', () => {
  test('Successful', async () => {
    const addonId = '/plone.app.iterate';
    const result = await cli.getAddon({ addonId });

    expect(result.data['@id']).toBe(
      'http://localhost:55001/plone/@addons/plone.app.iterate',
    );
  });

  test('Failure', async () => {
    const addonId = 'blah';

    try {
      await cli.getAddon({ addonId });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
