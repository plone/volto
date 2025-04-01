import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

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

describe('Get Roles', () => {
  test('Successful', async () => {
    const result = await cli.getRoles();

    expect(result.data[0]).toHaveProperty('@id');
    expect(result.data[0]).toHaveProperty('title');
  });
});
