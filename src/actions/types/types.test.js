import { getTypes } from './types';
import { GET_TYPES } from '../../constants/ActionTypes';

describe('Types action', () => {
  describe('getTypes', () => {
    it('should create an action to get the types', () => {
      const url = '/blog';
      const action = getTypes(url);

      expect(action.type).toEqual(GET_TYPES);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@types`);
    });
  });
});
