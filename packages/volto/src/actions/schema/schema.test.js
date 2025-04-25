import { getSchema } from './schema';
import { GET_SCHEMA } from '@plone/volto/constants/ActionTypes';

describe('Schema action', () => {
  describe('getSchema', () => {
    it('should create an action to get the schema', () => {
      const type = 'Document';
      const action = getSchema(type);

      expect(action.type).toEqual(GET_SCHEMA);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@types/${type}`);
    });

    it('should create an action to get the schema if url is passed', () => {
      const type = 'Document';
      const url = '/path/to/folder';
      const action = getSchema(type, url);

      expect(action.type).toEqual(GET_SCHEMA);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@types/${type}`);
    });
  });
});
