import { getQueryStringResults } from './querystringsearch';
import { GET_QUERYSTRING_RESULTS } from '@plone/volto/constants/ActionTypes';

describe('querystringsearch action', () => {
  describe('getQueryStringResults', () => {
    it('should create an action to get the querystring results', () => {
      const data = {
        query: [
          {
            i: 'portal_type',
            o: 'plone.app.querystring.operation.selection.any',
            v: ['Document'],
          },
        ],
      };
      const action = getQueryStringResults('', data);

      expect(action.type).toEqual(GET_QUERYSTRING_RESULTS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@querystring-search');
    });
    it('should create an action to get the querystring results with a page', () => {
      const data = {
        query: [
          {
            i: 'portal_type',
            o: 'plone.app.querystring.operation.selection.any',
            v: ['Document'],
          },
        ],
      };
      const action = getQueryStringResults('', data, null, 2);

      expect(action.type).toEqual(GET_QUERYSTRING_RESULTS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@querystring-search');
      expect(action.request.data).toEqual({ ...data, b_size: 25, b_start: 25 });
    });
  });
});
