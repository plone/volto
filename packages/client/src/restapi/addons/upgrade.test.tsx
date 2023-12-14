import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, upgradeAddonMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] UpgradeAddon', () => {
  test('Hook - Successful', async () => {
    const addonId = '/plone.app.volto';

    const { result } = renderHook(() => useMutation(upgradeAddonMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ addonId });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  // TODO: Find correct implementation for failure test as API returns status 204 when it is supposed to raise error
});
