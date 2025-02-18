import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createGroup } from './add';
import { getGroup } from './get';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateGroupMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Group', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const groupData = {
      groupname: `updategroup${randomId}`,
      description: 'new description',
    };

    await createGroup({ data: groupData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateGroupMutation()), {
      wrapper: createWrapper(),
    });

    const updateGroupData = {
      description: 'changed description',
    };

    act(() => {
      result.current.mutate({
        groupId: groupData.groupname,
        data: updateGroupData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const group = await getGroup({
      groupId: groupData.groupname,
      config: cli.config,
    });

    expect(group?.description).toBe('changed description');
  });

  test('Hook - Failure', async () => {
    const groupId = 'blah';
    const updateGroupData = {
      description: 'asd',
    };

    const { result } = renderHook(() => useMutation(updateGroupMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ groupId, data: updateGroupData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
