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
      title: `update-lock-page${randomId}`,
    };

    await cli.createContent({ path, data: contentData });

    const locktoken = 'sample-token';

    const result = await cli.updateLock({
      path: contentData.title,
      locktoken,
    });
  });

  test('Failure', async () => {
    const path = 'blah';

    try {
      await cli.updateLock({ path, locktoken: 'blah' });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
