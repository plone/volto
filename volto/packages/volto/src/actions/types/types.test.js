import { getTypes } from './types';
import { GET_TYPES } from '@plone/volto/constants/ActionTypes';

describe('Types action', () => {
  describe('getTypes', () => {
    it('should create an action to get the types', () => {
      const getState = () => ({
        userSession: {
          token: 'thetoken',
        },
      });
      const url = '/blog';
      const dispatch = jest.fn();

      getTypes(url)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: GET_TYPES,
        request: {
          op: 'get',
          path: `${url}/@types`,
        },
      });
    });
  });
});
