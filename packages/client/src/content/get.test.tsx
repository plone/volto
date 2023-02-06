import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper, testServer } from '../testUtils';
import { getContentQuery } from './get';
import { useQuery } from '@tanstack/react-query';

describe('[GET] Content', () => {
  test('successful query hook', async () => {
    const url = '/';
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path: `${url}` })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // console.dir(result.current.error, { depth: null });
    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });

  test('[GET] Content - Failure', async () => {
    const url = '/blah';
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path: `${url}` })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    // console.dir(result.current.error, { depth: null });
    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
