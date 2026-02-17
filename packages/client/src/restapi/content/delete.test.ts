import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import PloneClient from '../../client';
import type { RequestError } from '../types';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

// Get token
await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Delete Content', () => {
  test('Successful', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    await cli.createContent({ path, data });

    const pagePath = '/my-page';

    const result = await cli.deleteContent({ path: pagePath });

    expect(result.status).toBe(204);
  });

  test('Failure', async () => {
    const path = '/blah';

    try {
      await cli.deleteContent({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
