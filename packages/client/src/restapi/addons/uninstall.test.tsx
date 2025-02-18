import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, uninstallAddonMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] UninstallAddon', () => {
  test('Hook - Successful', async () => {
    const addonId = '/plone.app.session';

    const { result } = renderHook(() => useMutation(uninstallAddonMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ addonId });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  // TODO: Find correct implementation for failure test as API returns status 204 when it is supposed to raise error
});
