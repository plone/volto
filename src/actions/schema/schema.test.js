import getSchema from './schema';
import {
  GET_SCHEMA, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAIL,
} from '../../constants/ActionTypes';

describe('Schema action', () => {
  describe('getSchema', () => {
    it('should create an action to get the schema', () => {
      const type = 'Document';
      const action = getSchema(type);

      expect(action.types).toEqual([GET_SCHEMA, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAIL]);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@types/${type}`);
    });
  });
});
