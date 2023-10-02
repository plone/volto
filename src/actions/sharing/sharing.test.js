import {
  GET_SHARING,
  UPDATE_SHARING,
} from '@plone/volto/constants/ActionTypes';
import { getSharing, updateSharing } from './sharing';

describe('Sharing action', () => {
  describe('updateSharing', () => {
    it('should create an action to update sharing', () => {
      const url = 'http://127.0.0.1';
      const sharing = 'Hello World!';
      const action = updateSharing(url, sharing);

      expect(action.type).toEqual(UPDATE_SHARING);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@sharing`);
      expect(action.request.data).toEqual(sharing);
    });
  });

  describe('getSharing', () => {
    it('should create an action to get sharing', () => {
      const url = 'http://127.0.0.1';
      const action = getSharing(url);

      expect(action.type).toEqual(GET_SHARING);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@sharing`);
    });

    it('should create an action to get sharing with search param', () => {
      const url = 'http://127.0.0.1';
      const search = 'admin';
      const action = getSharing(url, search);

      expect(action.type).toEqual(GET_SHARING);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@sharing?search=${search}`);
    });
  });
});
