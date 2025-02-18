import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { createGroup } from './add';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteGroupMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Group', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const groupData = {
      groupname: `deletegroup${randomId}`,
    };

    await createGroup({ data: groupData, config: cli.config });

    const { result } = renderHook(() => useMutation(deleteGroupMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ groupId: groupData.groupname });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const groupId = 'blah';

    const { result } = renderHook(() => useMutation(deleteGroupMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ groupId });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
