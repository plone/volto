import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getControlpanelQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Controlpanel', () => {
  test('Hook - Successful - editing', async () => {
    const path = 'editing';

    const { result } = renderHook(
      () => useQuery(getControlpanelQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/@controlpanels/${path}`,
    );
    expect(result.current.data?.group).toBe('Content');
  });

  test('Hook - Successful - content-rules', async () => {
    const path = 'content-rules';

    const { result } = renderHook(
      () => useQuery(getControlpanelQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/@controlpanels/${path}`,
    );
    expect(result.current.data?.title).toBe('Content Rules');
  });

  test('Hook - Successful - dexterity-types', async () => {
    const path = 'dexterity-types';

    const { result } = renderHook(
      () => useQuery(getControlpanelQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/@controlpanels/${path}`,
    );
    expect(result.current.data?.title).toBe('Content Types');
  });
});
