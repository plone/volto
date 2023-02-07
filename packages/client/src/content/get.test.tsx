import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper, testServer } from '../testUtils';
import { getContentQuery } from './get';
import { useQuery } from '@tanstack/react-query';

describe('[GET] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const { result } = renderHook(() => useQuery(getContentQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // console.dir(result.current.error, { depth: null });
    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(() => useQuery(getContentQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // console.dir(result.current.error, { depth: null });
    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });

  test('Hook - fullobjects', async () => {
    const path = '/';
    const fullObjects = true;
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path, fullObjects })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });

  test.skip('Hook - version', async () => {
    const path = '/';
    const version = 'abcd';
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path, version })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });

  test.skip('Hook - fullObjects && version', async () => {
    const path = '/';
    const fullObjects = true;
    const version = 'abcd';
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path, fullObjects, version })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });
});
