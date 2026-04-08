import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createUser } from './add';
import { getUser } from './get';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateUserMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] UserUpdate', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updateUserData = {
      username: 'changedUsername',
    };

    await createUser({ data: userData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        userId: userData.username,
        data: updateUserData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const user = await getUser({
      userId: userData.username,
      config: cli.config,
    });

    expect(user.username).toBe('changedUsername');
  });

  test('Hook - Successful - potrait', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because the user portrait field replaces each hyphen in userId with double hyphens

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updatePortraitData = {
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
      },
    };

    await createUser({ data: userData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        userId: userData.username,
        data: updatePortraitData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const user = await getUser({
      userId: userData.username,
      config: cli.config,
    });

    expect(user.portrait).toBe(
      `http://localhost:55001/plone/@portrait/${userData.username}`,
    );
  });

  test('Hook - Successful - potrait & scale', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because the user portrait field replaces each hyphen in userId with double hyphens

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updatePortraitData = {
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
        scale: true,
      },
    };

    await createUser({ data: userData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        userId: userData.username,
        data: updatePortraitData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const user = await getUser({
      userId: userData.username,
      config: cli.config,
    });

    expect(user.portrait).toBe(
      `http://localhost:55001/plone/@portrait/${userData.username}`,
    );
  });

  test('Hook - Successful - username & portrait', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because the user portrait field replaces each hyphen in userId with double hyphens

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updateUserData = {
      username: 'changedUsername',
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
        scale: true,
      },
    };

    await createUser({ data: userData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        userId: userData.username,
        data: updateUserData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const user = await getUser({
      userId: userData.username,
      config: cli.config,
    });

    expect(user.username).toBe(updateUserData.username);
    expect(user.portrait).toBe(
      `http://localhost:55001/plone/@portrait/${userData.username}`,
    );
  });
  // TODO: Find correct implementation for failure test, currently no error is returned on updating non existing user
});
