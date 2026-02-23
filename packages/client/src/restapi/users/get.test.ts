import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
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

describe('Get User', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const userData = {
      username: `getTestUser${randomId}`,
      email: `getTestUser${randomId}@example.com`,
      password: 'password',
    };

    await cli.createUser({ data: userData });

    const result = await cli.getUser({ userId: userData.username });

    expect(result.data.id).toBe(userData.username);
  });

  test('Failure', async () => {
    const userData = {
      username: 'getTestUserFail',
      email: 'getTestUser@exampleFail.com',
      password: 'password',
    };

    try {
      await cli.getUser({ userId: userData.username });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
