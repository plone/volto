import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getWorkflowQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Workflow', () => {
  test('Hook - Successful', async () => {
    const path = '/';

    const { result } = renderHook(() => useQuery(getWorkflowQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@workflow',
    );
  });

  test('Hook - Successful - page', async () => {
    const contentData = {
      '@type': 'Document',
      title: 'workflowtest',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getWorkflowQuery({ path: contentData.title })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/${contentData.title}/@workflow`,
    );
  });

  test('Hook - Failure', async () => {
    const path = 'blah';

    const { result } = renderHook(() => useQuery(getWorkflowQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
