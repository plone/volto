import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { createRelations } from './add';
import { deleteContent } from '../content/delete';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, fixRelationsMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] RelationsFix', () => {
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

    const { result } = renderHook(() => useMutation(fixRelationsMutation()), {
      wrapper: createWrapper(),
    });

    const relationsData = {
      items: [
        {
          relation: 'fixRelatedItems',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await createRelations({ data: relationsData, config: cli.config });
    await deleteContent({ path: contentData2.title, config: cli.config });
    // Deleting the associated page results in a broken relation

    act(() => {
      result.current.mutate({});
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
