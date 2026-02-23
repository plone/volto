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

describe('Lock', () => {
  test('Successful', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `add-lock-page${randomId}`,
    };

    await cli.createContent({ path, data: contentData });

    const addLockData = {};

    const result = await cli.createLock({
      path: contentData.title,
      data: addLockData,
    });

    expect(result.data).toHaveProperty('created');
    expect(result.data.locked).toBe(true);
  });

  test('Successful - body', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `add-lock-page${randomId}`,
    };

    await cli.createContent({ path, data: contentData });

    const addLockData = {
      timeout: 3600,
    };

    const result = await cli.createLock({
      path: contentData.title,
      data: addLockData,
    });

    expect(result.data).toHaveProperty('created');
    expect(result.data.locked).toBe(true);
    expect(result.data.timeout).toBe(3600);
  });

  test('Failure', async () => {
    const path = 'blah';

    const addLockData = {};

    try {
      await cli.createLock({ path, data: addLockData });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
