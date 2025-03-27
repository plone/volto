import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get Roles', () => {
  test('Successful', async () => {
    const result = await cli.getRoles();

    expect(result.data[0]).toHaveProperty('@id');
    expect(result.data[0]).toHaveProperty('title');
  });
});
