import getSchema from './schema';
import { GET_SCHEMA } from '../../constants/ActionTypes';

describe('Schema action', () => {
  describe('getSchema', () => {
    it('should create an action to get the schema', () => {
      const type = 'Document';
      const action = getSchema(type);

      expect(action.type).toEqual(GET_SCHEMA);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@types/${type}`);
    });
  });
});
