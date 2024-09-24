import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, getNavrootQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Navroot', () => {
  test('Hook - Successful - root', async () => {
    const { result } = renderHook(
      () => useQuery(getNavrootQuery({ path: '/' })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@navroot',
    );
  });

  test('Hook - Successful - content', async () => {
    const contentData = {
      '@type': 'Document',
      title: 'navroot-test',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getNavrootQuery({ path: contentData.title })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/${contentData.title}/@navroot`,
    );
  });

  test('Hook - Failure', async () => {
    const path = 'blah';

    const { result } = renderHook(() => useQuery(getNavrootQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
