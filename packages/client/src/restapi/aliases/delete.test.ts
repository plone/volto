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

describe('Delete Aliases', () => {
  test('Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'delete-alias-page',
    };
    await cli.createContent({ path, data: contentData });

    const pagePath = 'delete-alias-page';

    const aliasesData = {
      items: [
        {
          path: '/delete-alias',
        },
      ],
    };

    await cli.createAlias({
      path: pagePath,
      data: aliasesData,
    });

    const result = await cli.deleteAliases({ path, data: aliasesData });
    expect(result.status).toBe(204);
  });

  test('Failure', async () => {
    const path = '/blah';
    const aliasesData = {
      items: [
        {
          path: '/delete-fail-alias',
        },
      ],
    };

    try {
      await cli.deleteAliases({ path, data: aliasesData });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
