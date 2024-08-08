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

const { login, runUpgradeMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Upgrade', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useMutation(runUpgradeMutation()), {
      wrapper: createWrapper(),
    });

    const upgradeDryData = {
      dry_run: true,
    };

    act(() => {
      result.current.mutate({ data: upgradeDryData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@upgrade',
    );
    expect(result.current.data?.dry_run).toBe(true);
  });

  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useMutation(runUpgradeMutation()), {
      wrapper: createWrapper(),
    });

    const upgradeData = {
      dry_run: false,
    };

    act(() => {
      result.current.mutate({ data: upgradeData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@upgrade',
    );
    expect(result.current.data?.dry_run).toBe(false);
    expect(result.current.data?.upgraded).toBe(true);
  });
});
