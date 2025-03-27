import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

describe('Get Breadcrumbs', () => {
  test('Successful', async () => {
    const path = '/';
    const result = await cli.getBreadcrumbs({ path });

    expect(result.data['@id']).toBe(
      'http://localhost:55001/plone/@breadcrumbs',
    );
  });

  test('Failure', async () => {
    const path = '/blah';

    try {
      await cli.getBreadcrumbs({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
