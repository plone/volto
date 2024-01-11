import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { act } from 'react-dom/test-utils';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createRuleMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Rule', () => {
  test.skip('Hook - Successful', async () => {
    const randomId = uuid();
    const ruleId = `add-rule${randomId}`;

    const { result } = renderHook(() => useMutation(createRuleMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ ruleId });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.message).toBe(
      `Successfully assigned the rule ${ruleId}`,
    );
  });
});
