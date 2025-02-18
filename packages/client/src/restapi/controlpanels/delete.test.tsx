import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createControlpanel } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteControlpanelMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Controlpanel', () => {
  test('Hook - Successful - dexterity-types', async () => {
    const path = 'dexterity-types';

    const addControlpanelData = {
      description: 'A custom content-type',
      title: `custom_content_type_delete`,
    };

    await createControlpanel({
      path,
      data: addControlpanelData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useMutation(deleteControlpanelMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const deleteControlpanelPath = `${path}/${addControlpanelData.title}`;

    act(() => {
      result.current.mutate({ path: deleteControlpanelPath });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Successful - content-rules', async () => {
    const path = 'content-rules';

    const addControlpanelData = {
      cascading: false,
      description: 'New rule added in the testing setup',
      enabled: true,
      event: 'Comment added',
      stop: false,
      title: 'New test rule',
    };

    await createControlpanel({
      path,
      data: addControlpanelData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useMutation(deleteControlpanelMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const deleteControlpanelPath = `${path}/rule-1`;

    act(() => {
      result.current.mutate({ path: deleteControlpanelPath });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
