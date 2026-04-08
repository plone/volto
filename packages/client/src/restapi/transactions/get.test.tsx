import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getTransactionsQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Transactions', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useQuery(getTransactionsQuery({})), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // TODO: Find how to create transactions, currently API returns empty array

    // expect(result.current.data?.[0]).toHaveProperty('id');
  });
});
