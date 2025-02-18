import { getQuerystring } from './querystring';
import { GET_QUERYSTRING } from '@plone/volto/constants/ActionTypes';

describe('Querystring action', () => {
  describe('getQuerystring', () => {
    it('should create an action to get the querystring config', () => {
      const action = getQuerystring();

      expect(action.type).toEqual(GET_QUERYSTRING);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@querystring');
    });
  });
});
