import searchContent from './search';
import {
  SEARCH_CONTENT_PENDING, SEARCH_CONTENT_SUCCESS, SEARCH_CONTENT_FAIL,
} from '../../constants/ActionTypes';

describe('Search action', () => {
  describe('searchContent', () => {
    it('should create an action to get the search results', () => {
      const text = 'cows';
      const action = searchContent(text);

      expect(action.types).toEqual([
        SEARCH_CONTENT_PENDING,
        SEARCH_CONTENT_SUCCESS,
        SEARCH_CONTENT_FAIL,
      ]);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@search?SearchableText=${text}`);
    });
  });
});
