import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createControlpanel } from './add';
import { getControlpanel } from './get';
import { getPathFromPageTitle } from '../../utils/test';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateControlpanelMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Controlpanel', () => {
  test('Hook - Successful - editing', async () => {
    const path = 'editing';
    const updateControlpanelData = {
      default_editor: 'TinyMCE',
      ext_editor: true,
    };

    const { result } = renderHook(
      () => useMutation(updateControlpanelMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({
        path,
        data: updateControlpanelData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await getControlpanel({ path, config: cli.config });
  });

  test('Hook - Successful - dexterity-types', async () => {
    const path = 'dexterity-types';

    const addControlpanelData = {
      description: 'A custom content-type',
      title: `custom_content_type`,
    };

    await createControlpanel({
      path,
      data: addControlpanelData,
      config: cli.config,
    });

    const updateControlpanelPath = `${path}/${addControlpanelData.title}`;

    const updateControlpanelData = {
      description: 'A content-type',
      'plone.richtext': true,
      'plone.versioning': true,
      title: 'Changed Content Type',
    };

    const { result } = renderHook(
      () => useMutation(updateControlpanelMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({
        path: updateControlpanelPath,
        data: updateControlpanelData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const controlpanel = await getControlpanel({ path, config: cli.config });

    // expect(controlpanel?.items.map((item) => item.title)).toBe('');
  });

  test('Hook - Successful - content-rules', async () => {
    const randomId = uuid().replace(/-/g, '');
    const path = 'content-rules';

    const addControlpanelData = {
      cascading: false,
      description: 'New rule added in the testing setup',
      enabled: true,
      event: 'Comment added',
      stop: false,
      title: `New test rule ${randomId}`,
    };

    await createControlpanel({
      path,
      data: addControlpanelData,
      config: cli.config,
    });

    const updateControlpanelPath = `${path}/rule-1`;

    const updateControlpanelData = {
      cascading: true,
      description: 'Description changed',
      enabled: false,
      event: 'Comment removed',
      stop: true,
    };

    const { result } = renderHook(
      () => useMutation(updateControlpanelMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({
        path: updateControlpanelPath,
        data: updateControlpanelData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const controlpanel = await getControlpanel({ path, config: cli.config });

    expect(controlpanel?.items[0][0].description).toBe(
      updateControlpanelData.description,
    );
  });
});
