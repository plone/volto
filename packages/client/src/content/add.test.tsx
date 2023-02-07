import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper, testServer } from '../testUtils';
import { createContentQuery } from './add';
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

describe('[POST] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };

    const { result } = renderHook(
      () => useQuery(createContentQuery({ path, data })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // console.dir(result.current.error, { depth: null });
    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/my-page',
    );
    expect(result.current.data?.title).toBe('My Page');
  });

  test('Hook - Successful - setup/tearingDown setup', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };

    const { result } = renderHook(
      () => useQuery(createContentQuery({ path, data })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // console.dir(result.current.data['@id'], { depth: null });
    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/my-page',
    );
    expect(result.current.data?.title).toBe('My Page');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    const { result } = renderHook(
      () => useQuery(createContentQuery({ path, data })),
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
