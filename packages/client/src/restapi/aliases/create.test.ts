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

describe('Create Alias', () => {
  test('Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'add-alias-page',
    };
    await cli.createContent({ path, data: contentData });

    const pagePath = 'add-alias-page';

    const aliasesData = {
      items: [
        {
          path: '/add-alias',
        },
        {
          path: '/add-alias-2',
        },
      ],
    };
    const result = await cli.createAlias({ path: pagePath, data: aliasesData });
    expect(result.status).toBe(204);
  });

  test('Failure', async () => {
    const path = '/blah';
    const aliasData = {
      items: [
        {
          path: '/add-fail-alias',
        },
      ],
    };

    try {
      await cli.createAlias({ path, data: aliasData });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
