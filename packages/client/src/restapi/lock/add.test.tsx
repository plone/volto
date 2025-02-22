import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { createContent } from '../content/add';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createLockMutation } = cli;

await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Lock', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `add-lock-page${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(() => useMutation(createLockMutation()), {
      wrapper: createWrapper(),
    });

    const addLockData = {};

    act(() => {
      result.current.mutate({ path: contentData.title, data: addLockData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveProperty('created');
    expect(result.current.data?.locked).toBe(true);
  });

  test('Hook - Successful - body', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `add-lock-page${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(() => useMutation(createLockMutation()), {
      wrapper: createWrapper(),
    });

    const addLockData = {
      timeout: 3600,
    };

    act(() => {
      result.current.mutate({ path: contentData.title, data: addLockData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveProperty('created');
    expect(result.current.data?.locked).toBe(true);
    expect(result.current.data?.timeout).toBe(3600);
  });

  test('Hook - Failure', async () => {
    const path = 'blah';

    const addLockData = {};

    const { result } = renderHook(() => useMutation(createLockMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: addLockData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
