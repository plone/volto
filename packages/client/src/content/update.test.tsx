import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper, testServer } from '../testUtils';
import { getContent } from './get';
import { createContent } from './add';
import { updateContentQuery } from './update';
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

describe('[PATCH] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    await createContent({ path, data });

    const dataPatch = {
      title: 'My Page updated',
    };
    const pagePath = '/my-page';

    const { result } = renderHook(
      () => useQuery(updateContentQuery({ path: pagePath, data: dataPatch })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const page = await getContent({ path: pagePath });

    // console.dir(page, { depth: null });
    expect(page?.['@id']).toBe('http://localhost:55001/plone/my-page');
    expect(page?.title).toBe('My Page updated');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    const { result } = renderHook(
      () => useQuery(updateContentQuery({ path, data })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    // console.dir(result.current.error, { depth: null });
    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
