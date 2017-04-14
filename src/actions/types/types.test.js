import getTypes from './types';
import { GET_TYPES } from '../../constants/ActionTypes';

describe('Types action', () => {
  describe('getTypes', () => {
    it('should create an action to get the types', () => {
      const url = '/blog';
      const action = getTypes(url);

      expect(action.type).toEqual(GET_TYPES);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@types`);
    });
  });
});
