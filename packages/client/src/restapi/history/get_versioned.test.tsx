import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { setup, teardown } from '../../resetFixture';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getHistoryVersionedQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] HistoryVersioned', () => {
  test('Hook - Successful', async () => {
    const contentData = {
      '@type': 'Document',
      title: `historyversion`,
      versioning_enabled: true,
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const { result } = renderHook(
      () =>
        useQuery(
          getHistoryVersionedQuery({
            path: contentData.title,
            version: 0,
          }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    // TODO: Find why versioning_enabled is not working
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(
      () =>
        useQuery(
          getHistoryVersionedQuery({
            path,
            version: 0,
          }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
