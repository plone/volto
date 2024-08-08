import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createUser } from './add';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getUserQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] User', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const userData = {
      username: `getTestUser${randomId}`,
      email: `getTestUser${randomId}@example.com`,
      password: 'password',
    };

    await createUser({ data: userData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getUserQuery({ userId: userData.username })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe(userData.username);
  });

  test('Hook - Failure', async () => {
    const userData = {
      username: 'getTestUserFail',
      email: 'getTestUser@exampleFail.com',
      password: 'password',
    };

    const { result } = renderHook(
      () => useQuery(getUserQuery({ userId: userData.username })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
