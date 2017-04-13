import getTypes from './types';
import {
  GET_TYPES_PENDING,
  GET_TYPES_SUCCESS,
  GET_TYPES_FAIL,
} from '../../constants/ActionTypes';

describe('Types action', () => {
  describe('getTypes', () => {
    it('should create an action to get the types', () => {
      const url = '/blog';
      const action = getTypes(url);

      expect(action.types).toEqual([
        GET_TYPES_PENDING,
        GET_TYPES_SUCCESS,
        GET_TYPES_FAIL,
      ]);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@types`);
    });
  });
});
