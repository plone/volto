import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

describe('Get Vocabulary', () => {
  test('Successful', async () => {
    const path = 'plone.app.vocabularies.ReallyUserFriendlyTypes';

    const result = await cli.getVocabulary({ path });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/++api++/@vocabularies/${path}`,
    );
  });

  test('Successful', async () => {
    const path = 'Fields';

    const result = await cli.getVocabulary({ path });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/++api++/@vocabularies/${path}`,
    );
  });

  test('Failure', async () => {
    const path = '/blah';
    try {
      await cli.getVocabulary({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
