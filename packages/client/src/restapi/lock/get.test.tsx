import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { createLock } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getLockQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] Lock', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `add-lock-page${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });

    const lockData = {};

    await createLock({
      path: contentData.title,
      data: lockData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useQuery(getLockQuery({ path: contentData.title })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.locked).toBe(true);
    expect(result.current.data?.stealable).toBe(true);
  });

  test('Hook - Failure', async () => {
    const path = 'blah';

    const { result } = renderHook(() => useQuery(getLockQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
