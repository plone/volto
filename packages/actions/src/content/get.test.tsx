import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper, testServer } from '../testUtils';
import { getContentQuery } from './get';
import { useQuery } from '@tanstack/react-query';

describe('[GET] Content', () => {
  test('successful query hook', async () => {
    const url = '/';
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path: `${testServer}${url}` })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // console.dir(result.current.error, { depth: null });
    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });
});
