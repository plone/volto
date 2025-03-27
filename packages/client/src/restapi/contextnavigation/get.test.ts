import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

describe('Get Context Navigation', () => {
  test('Successful', async () => {
    const path = '/';
    const result = await cli.getContextNavigation({ path });

    expect(result.data['@id']).toBe(
      'http://localhost:55001/plone/@contextnavigation',
    );
  });

  test('Failure', async () => {
    const path = '/blah';
    try {
      await cli.getContextNavigation({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
