import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getRegistryQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Registry', () => {
  test('Hook - Successful', async () => {
    const registryName = 'plone.app.querystring.field.path.title';
    const { result } = renderHook(
      () => useQuery(getRegistryQuery({ registryName })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBe('Location');
  });

  test('Hook - Failure', async () => {
    const registryName = '/blah';
    const { result } = renderHook(
      () => useQuery(getRegistryQuery({ registryName })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
