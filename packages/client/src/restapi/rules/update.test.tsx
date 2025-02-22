import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createRule } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateRulesMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Rules', () => {
  test.skip('Hook - Successful - apply subfolder', async () => {
    const randomId = uuid();
    const ruleId = `update-rule${randomId}`;

    await createRule({ ruleId, config: cli.config });

    const updateRuleData = {
      'form.button.Bubble': true,
      rules_ids: [ruleId],
    };

    const { result } = renderHook(() => useMutation(updateRulesMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        data: updateRuleData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.message).toBe(
      `Successfully applied ['${ruleId}'] to subfolders`,
    );
  });

  test.skip('Hook - Successful - enable', async () => {
    const randomId = uuid();
    const ruleId = `update-rule${randomId}`;

    await createRule({ ruleId, config: cli.config });

    const updateRuleData = {
      'form.button.Enable': true,
      rules_ids: [ruleId],
    };

    const { result } = renderHook(() => useMutation(updateRulesMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        data: updateRuleData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.message).toBe(
      `Successfully enabled rules ['${ruleId}']`,
    );
  });

  test.skip('Hook - Successful - moveup', async () => {
    const randomId = uuid();
    const ruleId = `update-rule${randomId}`;

    await createRule({ ruleId, config: cli.config });

    const updateRuleData = {
      operation: 'move_up',
      rule_id: ruleId,
    };

    const { result } = renderHook(() => useMutation(updateRulesMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        data: updateRuleData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.message).toBe(
      'Successfully applied the move_up',
    );
  });
});
