import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { afterEach, beforeEach } from 'vitest';
import { describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { getRelations } from './get';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createRelationsMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Relations', () => {
  test('Hook - Successful', async () => {
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

    const { result } = renderHook(
      () => useMutation(createRelationsMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const relationsData = {
      items: [
        {
          relation: 'addRelatedItems',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    const relationName = relationsData.items[0].relation;

    act(() => {
      result.current.mutate({ data: relationsData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const relation = await getRelations({
      relation: relationName,
      config: cli.config,
    });

    expect(relation?.['@id']).toBe(
      `http://localhost:55001/plone/@relations?relation=${relationName}`,
    );
    expect(relation?.relations?.[relationName]?.items_total).toBe(1);
  });
});
