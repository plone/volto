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

describe('Get Aliases', () => {
  test('Successful', async () => {
    const path = '/';
    const result = await cli.getAliases({ path });

    expect(result.data['@id']).toBe('http://localhost:55001/plone/@aliases');
  });

  test('Failure', async () => {
    const path = '/blah';

    try {
      await cli.getAliases({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
