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

describe('Get UserSchema', () => {
  test('Successful', async () => {
    const result = await cli.getUserschema();

    expect(result.data).toHaveProperty('type');
    expect(result.data.fieldsets[0]).toHaveProperty('id');
  });
});
