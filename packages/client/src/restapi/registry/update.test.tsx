import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { getRegistry } from './get';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateRegistryMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Registry', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useMutation(updateRegistryMutation()), {
      wrapper: createWrapper(),
    });

    const updateRegistryData = {
      'plone.app.querystring.field.path.title': 'Value',
    };

    act(() => {
      result.current.mutate({
        data: updateRegistryData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const registery = await getRegistry({
      registryName: 'plone.app.querystring.field.path.title',
      config: cli.config,
    });

    expect(registery).toBe('Value');
  });

  test('Hook - Failure', async () => {
    const updateRegistryData = {
      blah: 'Value',
    };

    const { result } = renderHook(() => useMutation(updateRegistryMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: updateRegistryData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
