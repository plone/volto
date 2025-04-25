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

describe('Revert History', () => {
  test('Successful', async () => {
    const contentData = {
      '@type': 'Document',
      title: `reverthistoryversion`,
      versioning_enabled: true,
    };

    await cli.createContent({ path: '/', data: contentData });

    const revertHistoryData = {
      version: 0,
    };

    const result = await cli.revertHistory({
      path: contentData.title,
      data: revertHistoryData,
    });
    expect(result.status).toBe(200);
  });

  test('Failure', async () => {
    const path = '/blah';
    const revertHistoryData = {
      version: 0,
    };

    try {
      await cli.revertHistory({
        path,
        data: revertHistoryData,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
