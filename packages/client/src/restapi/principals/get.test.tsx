import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { createUser } from '../users/add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getPrincipalsQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] Principals', () => {
  test('Hook - Successful - group', async () => {
    const searchTerm = 'Reviewers';

    const { result } = renderHook(
      () => useQuery(getPrincipalsQuery({ search: searchTerm })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.groups[0].id).toBe('Reviewers');
  });

  test('Hook - Successful - user', async () => {
    const userData = {
      username: `principals-user`,
      email: `principals-user@example.com`,
      password: 'password',
    };

    await createUser({ data: userData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getPrincipalsQuery({ search: userData.username })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.users[0]['@id']).toBe(
      `http://localhost:55001/plone/@users/${userData.username}`,
    );
  });
});
