import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { installAddon } from '../addons/install';
import { createWorkingcopy } from './add';
import { updateContent } from '../content/update';
import { getContent } from '../content/get';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, checkInWorkingcopyMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] WorkingCopy', () => {
  test('Hook - Successful', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await installAddon({ addonId: '/plone.app.iterate', config: cli.config });

    const randomId = uuid();
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: `update-workingcopy${randomId}`,
    };

    await createContent({ path, data: contentData, config: cli.config });
    await createWorkingcopy({ path: contentData.title, config: cli.config });

    const workingcopyPath = `working_copy_of_${contentData.title}`;

    const updateData = {
      description: 'changed',
    };

    await updateContent({
      path: workingcopyPath,
      data: updateData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useMutation(checkInWorkingcopyMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ path: workingcopyPath });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const content = await getContent({
      path: contentData.title,
      config: cli.config,
    });

    expect(content?.description).toBe(updateData.description);
  });

  test('Hook - Failure', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await installAddon({ addonId: '/plone.app.iterate', config: cli.config });

    const path = 'blah';

    const { result } = renderHook(
      () => useMutation(checkInWorkingcopyMutation()),
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
