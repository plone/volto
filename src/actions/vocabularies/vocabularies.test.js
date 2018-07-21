import { getVocabulary } from './vocabularies';
import { GET_VOCABULARY } from '../../constants/ActionTypes';

describe('Vocabularies actions', () => {
  describe('getVocabulary', () => {
    it('should create an action to get a vocabulary', () => {
      const vocabulary = 'plone.app.vocabularies.Keywords';
      const action = getVocabulary(vocabulary);

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabulary);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@vocabularies/${vocabulary}`);
    });
  });
});
