import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';

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

describe('Get Principals', () => {
  test('Successful - group', async () => {
    const searchTerm = 'Reviewers';

    const result = await cli.getPrincipals({ search: searchTerm });

    expect(result.data.groups[0].id).toBe('Reviewers');
  });

  test('Successful - user', async () => {
    const userData = {
      username: `principals-user`,
      email: `principals-user@example.com`,
      password: 'password',
    };

    await cli.createUser({ data: userData });

    const result = await cli.getPrincipals({ search: userData.username });

    expect(result.data.users[0]['@id']).toBe(
      `http://localhost:55001/plone/@users/${userData.username}`,
    );
  });
});
