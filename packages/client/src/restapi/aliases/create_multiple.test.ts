import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import type { RequestError } from '../types';

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

describe('Create Aliases', () => {
  test('Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'add-multi-alias-page',
    };
    await cli.createContent({ path, data: contentData });

    const aliasesData = {
      items: [
        {
          datetime: '2022-10-07',
          path: '/add-multi-alias-1',
          'redirect-to': '/add-multi-alias-page',
        },

        {
          datetime: '2022-10-07',
          path: '/add-multi-alias-2',
          'redirect-to': '/add-multi-alias-page',
        },
      ],
    };

    const result = await cli.createAliases({ data: aliasesData });
    expect(result.status).toBe(204);
  });

  test('Failure', async () => {
    const aliasesData = {
      items: [
        {
          datetime: '2023-10-07',
          path: '/new-alias',
          'redirect-to': '/add-multi-fail-page',
        },
      ],
    };

    try {
      await cli.createAliases({ data: aliasesData });
    } catch (err) {
      expect((err as RequestError).status).toBe(400);
    }
  });
});
