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

describe('Delete UserDelete', () => {
  test('Successful', async () => {
    const userData = {
      username: 'deleteTestUser',
      email: 'deleteTestUser@example.com',
      password: 'password',
    };

    await cli.createUser({ data: userData });

    const result = await cli.deleteUser({ userId: userData.username });
  });

  test('Failure', async () => {
    try {
      await cli.deleteUser({ userId: 'blah' });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
