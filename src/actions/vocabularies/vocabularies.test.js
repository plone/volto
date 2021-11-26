import { getVocabulary } from './vocabularies';
import { GET_VOCABULARY } from '@plone/volto/constants/ActionTypes';

describe('Vocabularies actions', () => {
  describe('getVocabulary', () => {
    it('should create an action to get a vocabulary', () => {
      const vocabulary = 'plone.app.vocabularies.Keywords';
      const query = 'john';
      const action = getVocabulary(vocabulary, query);

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabulary);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@vocabularies/${vocabulary}?b_start=0&title=${query}`,
      );
    });
    it('should create an action to get a vocabulary if a URL is passed', () => {
      const vocabulary =
        'http://localhost:8080/@vocabularies/plone.app.vocabularies.Keywords';
      const query = 'john';
      const action = getVocabulary(vocabulary, query);

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabulary);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@vocabularies/plone.app.vocabularies.Keywords?b_start=0&title=${query}`,
      );
    });
    it('should create an action to get a vocabulary if a URL with path is passed', () => {
      const vocabulary =
        'http://localhost:8080/de/foo/bar/@vocabularies/plone.app.vocabularies.Keywords';
      const query = 'john';
      const action = getVocabulary(vocabulary, query);

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabulary);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@vocabularies/plone.app.vocabularies.Keywords?b_start=0&title=${query}`,
      );
    });
  });
});
