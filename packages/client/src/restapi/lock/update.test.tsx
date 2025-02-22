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

const { login, updateLockMutation } = cli;

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
      title: `update-lock-page${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateLockMutation()), {
      wrapper: createWrapper(),
    });

    const locktoken = 'sample-token';

    act(() => {
      result.current.mutate({
        path: contentData.title,
        locktoken,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const path = 'blah';

    const { result } = renderHook(() => useMutation(updateLockMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, locktoken: 'blah' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
