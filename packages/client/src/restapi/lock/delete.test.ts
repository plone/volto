import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { loginWithCreate } from '../../utils/test';
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

describe('Delete Lock', () => {
  test('Successful', async () => {
    const randomId = uuid();
    const path = '/';

    const contentData = {
      '@type': 'Document',
      title: `delete-lock-page${randomId}`,
    };

    await cli.createContent({ path, data: contentData });

    const addLockData = {};

    await cli.createLock({
      path: contentData.title,
      data: addLockData,
    });

    const result = await cli.deleteLock({ path: contentData.title });

    expect(result.data.locked).toBe(false);
  });

  test('Successful - force', async () => {
    const randomId = uuid();

    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: `delete-lock${randomId}`,
    };

    await cli.createContent({ path, data: contentData });

    const userName = `lock-test-user${randomId}`;
    const userData = {
      username: userName,
      email: `${userName}@example.com`,
      password: 'password',
      roles: ['Site Administrator'],
    };

    await loginWithCreate(cli, userData);

    const addLockData = {};

    await cli.createLock({
      path: contentData.title,
      data: addLockData,
    });

    const deleteLockData = {
      force: true,
    };

    const result = await cli.deleteLock({
      path: contentData.title,
      data: deleteLockData,
    });

    expect(result.data.locked).toBe(false);
  });

  test('Failure', async () => {
    const path = 'blah';

    try {
      await cli.deleteLock({ path, data: {} });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
