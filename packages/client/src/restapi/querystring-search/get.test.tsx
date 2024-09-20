import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, afterEach, describe, test, expect } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, getQuerystringSearchQuery } = cli;

beforeEach(async () => {
  await setup();
  await login({ username: 'admin', password: 'secret' });
});

afterEach(async () => {
  await teardown();
});

describe('[GET] QuerystringSearch', () => {
  test('Hook - Successful - relation', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `get-search${randomId}`,
    };
    await createContent({ path: '/', data: contentData, config: cli.config });

    const querystringSearchData = {
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['Document'],
        },
      ],
    };

    const { result } = renderHook(
      () =>
        useQuery(
          getQuerystringSearchQuery({ query: querystringSearchData.query }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items_total).toBeGreaterThan(0);
  });

  test('Hook - Successful - with path', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `get-search${randomId}`,
    };
    const path = '/test-folder';
    await createContent({ path: '/', data: { '@type': 'Folder', id: 'test-folder' }, config: cli.config });
    await createContent({ path, data: contentData, config: cli.config });

    const querystringSearchData = {
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['Document'],
        },
      ],
    };

    const { result } = renderHook(
      () =>
        useQuery(
          getQuerystringSearchQuery({ query: querystringSearchData.query, path }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items_total).toBe(1);
    expect(result.current.data?.items[0]['@id']).toContain(path);
  });
});
