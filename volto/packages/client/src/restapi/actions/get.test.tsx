import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getActionsQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Actions', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const { result } = renderHook(() => useQuery(getActionsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveProperty('user');
    expect(result.current.data).toHaveProperty('portal_tabs');
    expect(result.current.data).toHaveProperty('site_actions');
  });

  test('Hook - Successful - page', async () => {
    const contentData = {
      '@type': 'Document',
      title: 'actions-page',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getActionsQuery({ path: contentData.title })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveProperty('object');
    expect(result.current.data).toHaveProperty('portal_tabs');
    expect(result.current.data).toHaveProperty('site_actions');
    expect(result.current.data).toHaveProperty('user');
  });

  test('Hook - Failure', async () => {
    const path = 'blah';
    const { result } = renderHook(() => useQuery(getActionsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
