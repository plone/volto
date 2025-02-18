import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { createRelations } from './add';
import { getRelations } from './get';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteRelationsMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Relations', () => {
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
          relation: 'deleteRelatedItems',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await createRelations({ data: relationsData, config: cli.config });

    const relationName = relationsData.items[0].relation;

    const deleteRelationData = {
      relation: relationName,
    };

    const { result } = renderHook(
      () => useMutation(deleteRelationsMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ data: deleteRelationData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const relation = await getRelations({
      relation: relationName,
      config: cli.config,
    });

    expect(relation?.relations?.[relationName]?.items_total).toBe(0);
  });
});
