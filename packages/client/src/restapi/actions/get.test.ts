import { describe, test, expect } from 'vitest';
import ploneClient from '../../client';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get Actions', () => {
  test('Successful', async () => {
    const path = '/';
    const result = await cli.getActions({ path });

    expect(result.data).toHaveProperty('user');
    expect(result.data).toHaveProperty('portal_tabs');
    expect(result.data).toHaveProperty('site_actions');
  });

  test('Successful - page', async () => {
    const contentData = {
      '@type': 'Document',
      title: 'actions-page',
    };

    await cli.createContent({ path: '/', data: contentData });

    const result = await cli.getActions({ path: contentData.title });

    expect(result.data).toHaveProperty('object');
    expect(result.data).toHaveProperty('portal_tabs');
    expect(result.data).toHaveProperty('site_actions');
    expect(result.data).toHaveProperty('user');
  });

  test('Failure', async () => {
    const path = 'blah';

    try {
      await cli.getActions({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
