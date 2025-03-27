import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get UserSchema', () => {
  test('Successful', async () => {
    const result = await cli.getUserschema();

    expect(result.data).toHaveProperty('type');
    expect(result.data.fieldsets[0]).toHaveProperty('id');
  });
});
