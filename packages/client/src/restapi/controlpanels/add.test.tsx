import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createControlpanelMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Controlpanel', () => {
  test('Hook - Successful - content-rules', async () => {
    const randomId = uuid().replace(/-/g, '');
    const path = 'content-rules';
    const { result } = renderHook(
      () => useMutation(createControlpanelMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const contentruleData = {
      cascading: false,
      description: 'New rule added in the testing setup',
      enabled: true,
      event: 'Comment added',
      stop: false,
      title: `New test rule ${randomId}`,
    };

    act(() => {
      result.current.mutate({ path, data: contentruleData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Successful - dexterity-types', async () => {
    const randomId = uuid().replace(/-/g, '');
    const path = 'dexterity-types';
    const { result } = renderHook(
      () => useMutation(createControlpanelMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const dexteritytypeData = {
      description: 'A custom content-type',
      title: `My Custom Content ${randomId}`,
    };

    act(() => {
      result.current.mutate({
        path,
        data: dexteritytypeData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
