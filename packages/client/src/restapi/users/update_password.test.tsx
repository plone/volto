import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { getUniqueEntityName, loginWithCreate } from '../../utils/test';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updatePasswordMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] PasswordUpdate', () => {
  test('Hook - Successful', async () => {
    const username = getUniqueEntityName('resetTestUser');
    const userData = {
      username,
      email: `${username}@example.com`,
      password: 'password',
      roles: ['Site Administrator'],
    };

    await loginWithCreate(cli, userData);

    const { result } = renderHook(() => useMutation(updatePasswordMutation()), {
      wrapper: createWrapper(),
    });

    const resetUserData = {
      old_password: 'password',
      new_password: 'changedpassword',
    };

    act(() => {
      result.current.mutate({ userId: username, data: resetUserData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
