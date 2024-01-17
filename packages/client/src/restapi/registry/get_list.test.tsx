import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getRegistriesQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] RegistryList', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useQuery(getRegistriesQuery({})), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/++api++/@registry',
    );
  });
});
