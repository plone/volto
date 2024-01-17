import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, postQuerystringSearchMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] QuerystringSearch', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `post-search${randomId}`,
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
      () => useMutation(postQuerystringSearchMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ data: querystringSearchData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/++api++/@querystring-search',
    );
    expect(result.current.data?.items_total).toBeGreaterThan(0);
  });
});
