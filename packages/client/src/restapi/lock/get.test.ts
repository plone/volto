import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
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

describe('Get Lock', () => {
  test('Successful', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `add-lock-page${randomId}`,
    };

    await cli.createContent({ path, data: contentData });

    const lockData = {};

    await cli.createLock({
      path: contentData.title,
      data: lockData,
    });

    const result = await cli.getLock({ path: contentData.title });

    expect(result.data.locked).toBe(true);
    expect(result.data.stealable).toBe(true);
  });

  test('Failure', async () => {
    const path = 'blah';

    try {
      await cli.getLock({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
