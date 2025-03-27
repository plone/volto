import { describe, expect, test } from 'vitest';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get RelationsList', () => {
  test('Successful', async () => {
    const result = await cli.getAllRelations();

    expect(result.data['@id']).toBe('http://localhost:55001/plone/@relations');
  });
});
