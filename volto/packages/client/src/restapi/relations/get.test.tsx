import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { afterEach, beforeEach } from 'vitest';
import { describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { createRelations } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getRelationsQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] Relations', () => {
  test('Hook - Successful - relation', async () => {
    const randomId = uuid();
    const contentData1 = {
      '@type': 'Document',
      title: `page1${randomId}`,
    };
    const contentData2 = {
      '@type': 'Document',
      title: `page2${randomId}`,
    };

    await createContent({ path: '/', data: contentData1, config: cli.config });
    await createContent({ path: '/', data: contentData2, config: cli.config });

    const relationsData = {
      items: [
        {
          relation: 'relatedItems1',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await createRelations({ data: relationsData, config: cli.config });

    const relation = relationsData.items[0].relation;

    const { result } = renderHook(
      () => useQuery(getRelationsQuery({ relation })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/@relations?relation=${relation}`,
    );
    expect(result.current.data?.relations?.[relation]?.items_total).toBe(1);
  });

  test('Hook - Successful - source', async () => {
    const randomId = uuid();
    const contentData1 = {
      '@type': 'Document',
      title: `page1${randomId}`,
    };
    const contentData2 = {
      '@type': 'Document',
      title: `page2${randomId}`,
    };

    await createContent({ path: '/', data: contentData1, config: cli.config });
    await createContent({ path: '/', data: contentData2, config: cli.config });

    const relationsData = {
      items: [
        {
          relation: 'relatedItems2',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await createRelations({ data: relationsData, config: cli.config });

    const relation = relationsData.items[0].relation;
    const source = relationsData.items[0].source;

    const { result } = renderHook(
      () => useQuery(getRelationsQuery({ source })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/@relations?source=%2F${contentData1.title}`,
    );
    expect(result.current.data?.relations?.[relation]?.items_total).toBe(1);
  });

  test('Hook - Successful - source and relation', async () => {
    const randomId = uuid();
    const contentData1 = {
      '@type': 'Document',
      title: `page1${randomId}`,
    };
    const contentData2 = {
      '@type': 'Document',
      title: `page2${randomId}`,
    };

    await createContent({ path: '/', data: contentData1, config: cli.config });
    await createContent({ path: '/', data: contentData2, config: cli.config });

    const relationsData = {
      items: [
        {
          relation: 'relatedItems3',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await createRelations({ data: relationsData, config: cli.config });

    const relation = relationsData.items[0].relation;
    const source = relationsData.items[0].source;

    const { result } = renderHook(
      () => useQuery(getRelationsQuery({ source: source, relation: relation })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/@relations?relation=${relation}&source=%2F${contentData1.title}`,
    );
    expect(result.current.data?.relations?.[relation]?.items_total).toBe(1);
  });

  test('Hook - Failure', async () => {
    const relationName = 'blah';

    const { result } = renderHook(
      () => useQuery(getRelationsQuery({ relation: relationName })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.relations?.[relationName]?.items_total).toBe(0);

    // API returns does not return error for non existing relations
  });
});
