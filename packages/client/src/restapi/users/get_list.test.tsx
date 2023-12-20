import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getUsersQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] UsersList', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useQuery(getUsersQuery({})), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0]).toHaveProperty('@id');
  });

  test('Hook - Successful - groupsFilter', async () => {
    const { result } = renderHook(
      () => useQuery(getUsersQuery({ groupsFilter: ['AuthenticatedUsers'] })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0]).toHaveProperty('@id');
  });

  test('Hook - Successful - query', async () => {
    const { result } = renderHook(
      () => useQuery(getUsersQuery({ query: 'test_user_1_' })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0]).toHaveProperty('@id');
  });
});
