import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { installAddon } from '../addons/install';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createWorkingcopyMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Workingcopy', () => {
  test('Hook - Successful', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await installAddon({ addonId: '/plone.app.iterate', config: cli.config });

    const randomId = uuid();
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: `add-workingcopy${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(
      () => useMutation(createWorkingcopyMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ path: contentData.title });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/working_copy_of_${contentData.title}`,
    );
  });

  test('Hook - Failure', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await installAddon({ addonId: '/plone.app.iterate', config: cli.config });

    const path = 'blah';

    const { result } = renderHook(
      () => useMutation(createWorkingcopyMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ path });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
