import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { createLock } from './add';
import { loginWithCreate } from '../../utils/test';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteLockMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Lock', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `delete-lock-page${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });

    const addLockData = {};

    await createLock({
      path: contentData.title,
      data: addLockData,
      config: cli.config,
    });

    const { result } = renderHook(() => useMutation(deleteLockMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: contentData.title });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.locked).toBe(false);
  });

  test('Hook - Successful - force', async () => {
    const randomId = uuid();

    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: `delete-lock${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });

    const userName = `lock-test-user${randomId}`;
    const userData = {
      username: userName,
      email: `${userName}@example.com`,
      password: 'password',
      roles: ['Site Administrator'],
    };

    await loginWithCreate(cli, userData);

    const addLockData = {};

    await createLock({
      path: contentData.title,
      data: addLockData,
      config: cli.config,
    });

    const deleteLockData = {
      force: true,
    };

    const { result } = renderHook(() => useMutation(deleteLockMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: contentData.title, data: deleteLockData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.locked).toBe(false);
  });

  test('Hook - Failure', async () => {
    const path = 'blah';

    const { result } = renderHook(() => useMutation(deleteLockMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: {} });
    });

    await waitFor(() => expect(result.current.data).toBe(undefined));
  });
});
