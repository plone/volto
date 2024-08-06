import { config } from '../../registry';
import { getVocabulary } from './vocabularies';
import { GET_VOCABULARY } from '@plone/volto/constants/ActionTypes';

describe('Vocabularies actions', () => {
  describe('getVocabulary', () => {
    it('should create an action to get a vocabulary', () => {
      const vocabNameOrURL = 'plone.app.vocabularies.Keywords';
      const query = 'john';
      const action = getVocabulary({ vocabNameOrURL, query });

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabNameOrURL);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@vocabularies/${vocabNameOrURL}?b_start=0&title=${query}`,
      );
    });
    it('should create an action to get a vocabulary if a URL is passed', () => {
      const vocabNameOrURL =
        'http://localhost:8080/@vocabularies/plone.app.vocabularies.Keywords';
      const query = 'john';
      const action = getVocabulary({ vocabNameOrURL, query });

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabNameOrURL);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@vocabularies/plone.app.vocabularies.Keywords?b_start=0&title=${query}`,
      );
    });
    it('should create an action to get a vocabulary if a URL with path is passed', () => {
      const vocabNameOrURL =
        'http://localhost:8080/de/foo/bar/@vocabularies/plone.app.vocabularies.Keywords';
      const query = 'john';
      const action = getVocabulary({ vocabNameOrURL, query });

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabNameOrURL);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@vocabularies/plone.app.vocabularies.Keywords?b_start=0&title=${query}`,
      );
    });
    it('should create an action to get a vocabulary if an b_size=-1 is passed', () => {
      const vocabNameOrURL =
        'http://localhost:8080/de/foo/bar/@vocabularies/plone.app.vocabularies.Keywords';
      const action = getVocabulary({ vocabNameOrURL, size: -1 });

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabNameOrURL);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@vocabularies/plone.app.vocabularies.Keywords?b_start=0&b_size=-1`,
      );
    });
    it('should create an action to get a contextual vocabulary if a URL with path is passed', () => {
      const vocabNameOrURL =
        'http://localhost:8080/de/foo/bar/@vocabularies/plone.app.vocabularies.Keywords';
      const query = 'john';
      config.settings.contextualVocabularies = [
        'plone.app.vocabularies.Keywords',
      ];
      const action = getVocabulary({ vocabNameOrURL, query });

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabNameOrURL);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/de/foo/bar/@vocabularies/plone.app.vocabularies.Keywords?b_start=0&title=${query}`,
      );
    });
  });
});
