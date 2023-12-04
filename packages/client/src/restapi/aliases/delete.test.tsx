import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { createContent } from '../content/add';
import { createAliases } from './add';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteAliasesMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Aliases', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'delete-alias-page',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const pagePath = 'delete-alias-page';

    const aliasesData = {
      items: [
        {
          path: '/delete-alias',
        },
      ],
    };

    await createAliases({
      path: pagePath,
      data: aliasesData,
      config: cli.config,
    });

    const { result } = renderHook(() => useMutation(deleteAliasesMutation()), {
      wrapper: createWrapper(),
    });

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
          path: '/delete-fail-alias',
        },
      ],
    };

    const { result } = renderHook(() => useMutation(deleteAliasesMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: aliasesData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
