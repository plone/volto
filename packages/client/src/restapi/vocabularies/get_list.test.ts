import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

describe('Get Vocabularies', () => {
  test('Successful', async () => {
    const result = await cli.getVocabularies();

    expect(result.data?.[0]).toHaveProperty('@id');
  });
});
