import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createGroup } from './add';
import { v4 as uuid } from 'uuid';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getGroupQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Group', () => {
  test('Hook - Successful', async () => {
    const groupId = '/Administrators';

    const { result } = renderHook(() => useQuery(getGroupQuery({ groupId })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe('Administrators');
  });

  test('Hook - Successful - with create', async () => {
    const randomId = uuid();
    const groupData = {
      groupname: `getgroup${randomId}`,
    };

    await createGroup({ data: groupData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getGroupQuery({ groupId: groupData.groupname })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe(groupData.groupname);
  });

  test('Hook - Failure', async () => {
    const groupId = 'blah';
    const { result } = renderHook(() => useQuery(getGroupQuery({ groupId })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
