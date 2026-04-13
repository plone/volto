import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ data: { login: 'admin', password: 'secret' } });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Get Registry', () => {
  test('Successful', async () => {
    const name = 'plone.app.querystring.field.path.title';
    const result = await cli.getRegistryRecord({ name });

    expect(result.data).toBe('Location');
  });

  test('Failure', async () => {
    const name = '/blah';

    try {
      await cli.getRegistryRecord({ name });
    } catch (err) {
      expect((err as RequestError).status).toBe(503);
    }
  });
});
