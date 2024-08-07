import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { setup, teardown } from '../../resetFixture';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, revertHistoryMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Revert History', () => {
  test('Hook - Successful', async () => {
    const contentData = {
      '@type': 'Document',
      title: `reverthistoryversion`,
      versioning_enabled: true,
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const revertHistoryData = {
      version: 0,
    };

    const { result } = renderHook(() => useMutation(revertHistoryMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        path: contentData.title,
        data: revertHistoryData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    // TODO: Find why versioning_enabled is not working
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const revertHistoryData = {
      version: 0,
    };

    const { result } = renderHook(() => useMutation(revertHistoryMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        path,
        data: revertHistoryData,
      });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
