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

const { login, createAliasesMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Aliases', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'add-alias-page',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const pagePath = 'add-alias-page';

    const { result } = renderHook(() => useMutation(createAliasesMutation()), {
      wrapper: createWrapper(),
    });

    const aliasesData = {
      items: [
        {
          path: '/add-alias',
        },
        {
          path: '/add-alias-2',
        },
      ],
    };

    act(() => {
      result.current.mutate({ path: pagePath, data: aliasesData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const aliasesData = {
      items: [
        {
          path: '/add-fail-alias',
        },
      ],
    };

    const { result } = renderHook(() => useMutation(createAliasesMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: aliasesData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
