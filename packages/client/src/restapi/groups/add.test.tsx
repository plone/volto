import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createGroupMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Group', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const { result } = renderHook(() => useMutation(createGroupMutation()), {
      wrapper: createWrapper(),
    });

    const groupData = {
      groupname: `addgroup${randomId}`,
    };

    act(() => {
      result.current.mutate({ data: groupData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.id).toBe(groupData.groupname);
  });
});
