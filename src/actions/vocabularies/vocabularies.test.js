import { getVocabulary } from './vocabularies';
import { GET_VOCABULARY } from '../../constants/ActionTypes';

describe('Vocabularies actions', () => {
  describe('getVocabulary', () => {
    it('should create an action to get a vocabulary', () => {
      const vocabulary = 'plone.app.vocabularies.Keywords';
      const action = getVocabulary(vocabulary);

      expect(action.type).toEqual(GET_VOCABULARY);
      expect(action.vocabulary).toEqual(vocabulary);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@vocabularies/${vocabulary}`);
    });
  });
});
