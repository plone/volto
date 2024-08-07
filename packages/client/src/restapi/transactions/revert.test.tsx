import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, revertTransactionsMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Transactions', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(
      () => useMutation(revertTransactionsMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const transactionsData = {
      transaction_ids: ['sample'],
    };

    act(() => {
      result.current.mutate({ data: transactionsData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // TODO: Find how to create transactions, currently API returns empty array

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // expect(result.current.data?.message).toBe(
    //   'Transactions has been reverted successfully.',
    // );
  });
});
