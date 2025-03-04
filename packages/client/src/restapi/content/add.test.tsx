import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { CreateContentArgs } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createContentMutation, useCreateContent } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const data: CreateContentArgs['data'] = {
      '@type': 'Document',
      title: 'My Page',
    };

    const { result } = renderHook(() => useMutation(createContentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/my-page',
    );
    expect(result.current.data?.title).toBe('My Page');
  });

  test('Hook - Successful - setup/tearingDown setup', async () => {
    const path = '/';
    const data: CreateContentArgs['data'] = {
      '@type': 'Document',
      title: 'My Page',
    };

    const { result } = renderHook(useCreateContent, {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/my-page',
    );
    expect(result.current.data?.title).toBe('My Page');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const data: CreateContentArgs['data'] = {
      '@type': 'Document',
      title: 'My Page',
    };
    const { result } = renderHook(() => useMutation(createContentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
