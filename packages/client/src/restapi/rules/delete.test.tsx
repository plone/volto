import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createRule } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteRulesMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Rules', () => {
  test.skip('Hook - Successful', async () => {
    const randomId = uuid();
    const ruleId = `delete-rule${randomId}`;

    await createRule({ ruleId, config: cli.config });

    const { result } = renderHook(() => useMutation(deleteRulesMutation()), {
      wrapper: createWrapper(),
    });

    const deleteRuleData = {
      rules_ids: [ruleId],
    };

    act(() => {
      result.current.mutate({ data: deleteRuleData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
