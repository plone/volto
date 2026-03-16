import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get Navroot', () => {
  test('Successful - root', async () => {
    const result = await cli.getNavroot({ path: '/' });

    expect(result.data['@id']).toBe('http://localhost:55001/plone/@navroot');
  });

  test('Successful - content', async () => {
    const contentData = {
      '@type': 'Document',
      title: 'navroot-test',
    };

    await cli.createContent({ path: '/', data: contentData });

    const result = await cli.getNavroot({ path: contentData.title });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/${contentData.title}/@navroot`,
    );
  });

  test('Failure', async () => {
    const path = 'blah';

    try {
      await cli.getNavroot({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
