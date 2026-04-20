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

describe('Get Type', () => {
  test('Successful', async () => {
    const result = await cli.getType({ contentType: 'Document' });

    expect(result.data).toHaveProperty('title');
    expect(result.data).toHaveProperty('type');
  });

  test('Failure', async () => {
    try {
      await cli.getType({ contentType: 'blah' });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
