import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

describe('Get QueryString', () => {
  test('Successful', async () => {
    const result = await cli.getQuerystring();

    expect(result.data['@id']).toBe(
      'http://localhost:55001/plone/@querystring',
    );
  });
});
