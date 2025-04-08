import { getQuerystring } from './querystring';
import { GET_QUERYSTRING } from '@plone/volto/constants/ActionTypes';

describe('Querystring action', () => {
  describe('getQuerystring', () => {
    it('should create an action to get the querystring config', () => {
      const getState = () => ({});
      const dispatch = jest.fn();
      getQuerystring()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_QUERYSTRING,
        request: {
          op: 'get',
          path: '/@querystring',
        },
      });
    });
    it('should get the querystring config in the current context', () => {
      const getState = () => ({
        content: {
          data: { '@id': 'http://localhost:3000/some/content' },
        },
      });
      const dispatch = jest.fn();
      getQuerystring()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_QUERYSTRING,
        request: {
          op: 'get',
          path: '/some/content/@querystring',
        },
      });
    });
  });
});
