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

describe('Update Content', () => {
  test('Successful', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    await cli.createContent({ path, data });

    const dataPatch = {
      title: 'My Page updated',
    };
    const pagePath = '/my-page';

    const result = await cli.updateContent({ path: pagePath, data: dataPatch });

    expect(result.status).toBe(204);

    const page = await cli.getContent({ path: pagePath });

    expect(page.data['@id']).toBe('http://localhost:55001/plone/my-page');
    expect(page.data.title).toBe('My Page updated');
  });

  test('Failure', async () => {
    const path = '/blah';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };

    try {
      await cli.updateContent({ path, data });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
