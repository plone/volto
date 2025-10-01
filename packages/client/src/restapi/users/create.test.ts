import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

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

describe('UserAdd', () => {
  test('Successful with resetPassword', async () => {
    const randomId = uuid();
    const userData = {
      username: `addTestUser${randomId}`,
      email: `addTestUser${randomId}@example.com`,
      password: 'password',
    };

    const result = await cli.createUser({ data: userData });

    expect(result.data.id).toBe(userData.username);
  });

  test('Successful with password', async () => {
    const randomId = uuid();
    const userData = {
      username: `addTestUser${randomId}`,
      email: `addTestUser${randomId}@example.com`,
      password: 'password',
    };

    const result = await cli.createUser({ data: userData });

    expect(result.data.id).toBe(userData.username);
  });
});
