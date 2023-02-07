import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper, testServer } from '../testUtils';
import { getContent } from './get';
import { createContent } from './add';
import { deleteContentQuery } from './delete';
import { login } from '../login/post';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import { setup, teardown } from '../resetFixture';
import { beforeAll, beforeEach } from 'vitest';
import { expect, test } from 'vitest';

beforeAll(async () => {
  const cookies = new Cookies();
  const { token } = await login('admin', 'secret');
  cookies.set('auth_token', token);
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    await createContent({ path, data });

    const pagePath = '/my-page';

    const { result } = renderHook(
      () => useQuery(deleteContentQuery({ path: pagePath })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const path = '/blah';

    const { result } = renderHook(
      () => useQuery(deleteContentQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
