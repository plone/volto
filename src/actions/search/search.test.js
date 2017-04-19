import searchContent from './search';
import { SEARCH_CONTENT } from '../../constants/ActionTypes';

describe('Search action', () => {
  describe('searchContent', () => {
    it('should create an action to get the search results', () => {
      const text = 'cows';
      const url = '/blog';
      const action = searchContent(url, { SearchableText: text });

      expect(action.type).toEqual(SEARCH_CONTENT);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(
        `${url}/@search?SearchableText=${text}`,
      );
    });
  });
});
