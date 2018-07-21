import { resetSearchContent, searchContent } from './search';
import {
  RESET_SEARCH_CONTENT,
  SEARCH_CONTENT,
} from '../../constants/ActionTypes';

describe('Search action', () => {
  describe('searchContent', () => {
    it('should create an action to get the search results', () => {
      const text = 'cows';
      const url = '/blog';
      const action = searchContent(url, { SearchableText: text });

      expect(action.type).toEqual(SEARCH_CONTENT);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}/@search?SearchableText=${text}`,
      );
    });

    it('can be called without extra options', () => {
      const url = '/blog';
      const action = searchContent(url);

      expect(action.type).toEqual(SEARCH_CONTENT);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@search`);
    });
  });

  describe('resetSearchContent', () => {
    it('can be called', () => {
      const action = resetSearchContent();

      expect(action.type).toEqual(RESET_SEARCH_CONTENT);
    });
  });
});
