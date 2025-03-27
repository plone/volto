import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get UsersList', () => {
  test('Successful', async () => {
    const result = await cli.getTypes();

    expect(result.data[0]).toHaveProperty('@id');
  });
});
