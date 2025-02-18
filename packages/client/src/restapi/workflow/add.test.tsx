import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { createContent } from '../content/add';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createWorkflowMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Workflow', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'workflowpage',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(() => useMutation(createWorkflowMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: contentData.title });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.action).toBe('publish');
  });

  test('Hook - Successful - with body', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'workflowpage',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(() => useMutation(createWorkflowMutation()), {
      wrapper: createWrapper(),
    });

    const workflowData = {
      comment: 'sample',
    };

    act(() => {
      result.current.mutate({ path: contentData.title, data: workflowData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.comments).toBe('sample');
  });

  test('Hook - Failure', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'workflowpage',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(() => useMutation(createWorkflowMutation()), {
      wrapper: createWrapper(),
    });

    const workflowData = {
      comment: 'sample',
    };

    act(() => {
      result.current.mutate({ path: 'blah', data: workflowData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
