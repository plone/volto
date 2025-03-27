import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get UsersList', () => {
  test('Successful', async () => {
    const result = await cli.getUsers({});

    expect(result.data[0]).toHaveProperty('@id');
  });

  test('Successful - groupsFilter', async () => {
    const result = await cli.getUsers({ groupsFilter: ['AuthenticatedUsers'] });

    expect(result.data[0]).toHaveProperty('@id');
  });

  test('Successful - query', async () => {
    const result = await cli.getUsers({ query: 'test_user_1_' });

    expect(result.data[0]).toHaveProperty('@id');
  });
});
