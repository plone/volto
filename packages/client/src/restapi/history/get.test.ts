import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
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

describe('Get History', () => {
  test('Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'front-page',
    };
    await cli.createContent({ path, data: contentData });

    const result = await cli.getHistory({ path: 'front-page' });

    expect(result.data[result.data.length - 1].action).toBe('Create');
  });

  test('Failure', async () => {
    const path = '/blah';

    try {
      await cli.getHistory({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
