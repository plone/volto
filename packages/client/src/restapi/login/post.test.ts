import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Login', () => {
  test('login request function', async () => {
    const result = await cli.login({
      username: 'admin',
      password: 'secret',
    });
    expect(result).toBeTypeOf('object');
    expect(result.data.token).toBeTypeOf('string');
  });
});
