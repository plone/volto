import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createRule } from './add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getRulesQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Rules', () => {
  test.skip('Hook - Successful', async () => {
    const randomId = uuid();
    const ruleId = `get-rule${randomId}`;

    await createRule({ ruleId, config: cli.config });

    const { result } = renderHook(() => useQuery(getRulesQuery({})), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(
      result.current.data?.['content-rules']?.assigned_rules.length,
    ).toBeGreaterThan(0);
  });
});
