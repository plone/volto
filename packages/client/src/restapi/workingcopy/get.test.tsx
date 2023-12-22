import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { installAddon } from '../addons/install';
import { v4 as uuid } from 'uuid';
import { createWorkingcopy } from './add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getWorkingcopyQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] WorkingCopy', () => {
  test('Hook - Successful', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await installAddon({ addonId: '/plone.app.iterate', config: cli.config });

    const randomId = uuid();
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: `get-workingcopy${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });
    await createWorkingcopy({ path: contentData.title, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getWorkingcopyQuery({ path: contentData.title })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.working_copy.title).toBe(contentData.title);
  });

  test('Hook - Failure', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await installAddon({ addonId: '/plone.app.iterate', config: cli.config });
    const path = 'blah';

    const { result } = renderHook(
      () => useQuery(getWorkingcopyQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
