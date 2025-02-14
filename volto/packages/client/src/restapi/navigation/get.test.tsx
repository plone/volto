import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { setup, teardown } from '../../resetFixture';
import { createContent } from '../content/add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { getNavigationQuery, login } = cli;

await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] Navigation', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const { result } = renderHook(
      () => useQuery(getNavigationQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@navigation',
    );
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(
      () => useQuery(getNavigationQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  test('Depth parameter', async () => {
    await createContent({
      path: '/',
      data: {
        '@type': 'Document',
        title: 'Level 1',
      },
      config: cli.config,
    });
    await createContent({
      path: '/level-1',
      data: {
        '@type': 'Document',
        title: 'Level 2',
      },
      config: cli.config,
    });
    await createContent({
      path: '/level-1/level-2',
      data: {
        '@type': 'Document',
        title: 'Level 3',
      },
      config: cli.config,
    });

    const depth2 = renderHook(
      () => useQuery(getNavigationQuery({ path: '/', depth: 2 })),
      {
        wrapper: createWrapper(),
      },
    );
    await waitFor(() => expect(depth2.result.current.isSuccess).toBe(true));
    const level1_1 = depth2.result.current.data?.items.find(
      (item) => item.title === 'Level 1',
    );
    expect(level1_1.items[0].title).toBe('Level 2');
    expect(level1_1.items[0].items.length).toBe(0);

    const depth3 = renderHook(
      () => useQuery(getNavigationQuery({ path: '/', depth: 3 })),
      {
        wrapper: createWrapper(),
      },
    );
    await waitFor(() => expect(depth3.result.current.isSuccess).toBe(true));
    const level1_2 = depth3.result.current.data?.items.find(
      (item) => item.title === 'Level 1',
    );
    expect(level1_2.items[0].items.length).toBe(1);
    expect(level1_2.items[0].items[0].title).toBe('Level 3');
  });
});
