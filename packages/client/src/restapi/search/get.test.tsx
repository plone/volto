import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getSearchQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] Search', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `page1${randomId}`,
      description: 'some-unique-data',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const query = {
      SearchableText: contentData.description,
    };

    const { result } = renderHook(() => useQuery(getSearchQuery({ query })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items[0].description).toBe(
      contentData.description,
    );
  });

  test('Hook - Successful - metadata', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `page1${randomId}`,
      description: 'some-unique-data',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const query = {
      SearchableText: contentData.description,
      metadata_fields: ['created', 'modified'],
    };

    const { result } = renderHook(() => useQuery(getSearchQuery({ query })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items[0]).toHaveProperty('created');
    expect(result.current.data?.items[0]).toHaveProperty('modified');
  });
});
