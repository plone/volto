import ploneClient from '../../client';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { setup, teardown } from '../../utils/test';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Get HistoryVersioned', () => {
  test('Successful', async () => {
    const contentData = {
      '@type': 'Document',
      title: `historyversion`,
      versioning_enabled: true,
    };

    await cli.createContent({ path: '/', data: contentData });

    const result = await cli.getHistoryVersion({
      path: contentData.title,
      version: 0,
    });
    expect(result.status).toBe(200);
  });

  test('Failure', async () => {
    const path = '/blah';

    try {
      await cli.getHistoryVersion({
        path,
        version: 0,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
