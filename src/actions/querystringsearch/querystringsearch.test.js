import { getQueryStringResults } from './querystringsearch';
import { GET_QUERYSTRING_RESULTS } from '../../constants/ActionTypes';

describe('querystringsearch action', () => {
  describe('getQueryStringResults', () => {
    it('should create an action to get the querystring results', () => {
      const action = getQueryStringResults();

      expect(action.type).toEqual(GET_QUERYSTRING_RESULTS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@querystring-search');
    });
  });
});
