import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Querystring Search', () => {
  test('Successful get', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `get-search${randomId}`,
    };

    await cli.createContent({ path: '/', data: contentData });

    const querystringSearchData = {
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['Document'],
        },
      ],
    };

    const result = await cli.querystringSearch({
      query: querystringSearchData.query,
    });

    expect(result.data.items_total).toBeGreaterThan(0);
  });

  test('Successful post', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `post-search${randomId}`,
    };

    await cli.createContent({ path: '/', data: contentData });

    const querystringSearchData = {
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['Document'],
        },
      ],
    };

    const result = await cli.querystringSearch({
      query: querystringSearchData.query,
      post: true,
    });

    expect(result.data['@id']).toBe(
      'http://localhost:55001/plone/++api++/@querystring-search',
    );
    expect(result.data.items_total).toBeGreaterThan(0);
  });
});
