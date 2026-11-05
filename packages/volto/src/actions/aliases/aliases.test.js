import { getAliases, addAliases, removeAliases } from './aliases';
import {
  GET_ALIASES,
  ADD_ALIASES,
  REMOVE_ALIASES,
} from '@plone/volto/constants/ActionTypes';

describe('Aliases action', () => {
  describe('getAliases', () => {
    it('should create an action to get all aliases', () => {
      const url = '/news';
      const action = getAliases(url);
      expect(action.type).toEqual(GET_ALIASES);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        '/news/@aliases?b_start=0&b_size=99999999999',
      );
    });

    it('should skip empty options and apply defaults', () => {
      const action = getAliases('/news', {
        query: '',
        manual: '',
        datetime: null,
        start: undefined,
        batchSize: '',
        batchStart: null,
      });
      expect(action.request.path).toEqual(
        '/news/@aliases?b_start=0&b_size=99999999999',
      );
    });

    it('should keep non-empty options', () => {
      const action = getAliases('/news', {
        query: 'foo',
        manual: false,
        batchSize: 10,
        batchStart: 20,
      });
      expect(action.request.path).toEqual(
        '/news/@aliases?q=foo&b_start=20&b_size=10&manual=false',
      );
    });
  });

  describe('addAliases', () => {
    it('should create an action to add aliases', () => {
      const url = '/news';
      const alias = '/newsAlias';
      const action = addAliases(url, {
        items: alias,
      });
      expect(action.type).toEqual(ADD_ALIASES);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/news/@aliases');
    });
  });

  describe('removeAliases', () => {
    it('should create an action to remove aliases', () => {
      const url = '/news';
      const alias = '/newsAlias';
      const action = removeAliases(url, {
        items: alias,
      });
      expect(action.type).toEqual(REMOVE_ALIASES);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual('/news/@aliases');
    });
  });
});
