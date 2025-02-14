import {
  createGroup,
  deleteGroup,
  getGroup,
  listGroups,
  updateGroup,
} from './groups';
import {
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUP,
  LIST_GROUPS,
  UPDATE_GROUP,
} from '@plone/volto/constants/ActionTypes';

describe('Groups action', () => {
  describe('createGroup', () => {
    it('should create an action to create a group', () => {
      const data = 'group';
      const action = createGroup(data);

      expect(action.type).toEqual(CREATE_GROUP);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@groups');
      expect(action.request.data).toEqual(data);
    });
  });

  describe('deleteGroup', () => {
    it('should create an action to delete a group', () => {
      const id = 'my-group';
      const action = deleteGroup(id);

      expect(action.type).toEqual(DELETE_GROUP);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(`/@groups/${id}`);
    });
  });

  describe('getGroup', () => {
    it('should create an action to get a group', () => {
      const id = 'my-group';
      const action = getGroup(id);

      expect(action.type).toEqual(GET_GROUP);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@groups/${id}`);
    });
  });

  describe('listGroups', () => {
    it('should create an action to list groups', () => {
      const action = listGroups();

      expect(action.type).toEqual(LIST_GROUPS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@groups');
    });
  });

  describe('updateGroup', () => {
    it('should create an action to update a group', () => {
      const id = 'my-group';
      const data = 'group';
      const action = updateGroup(id, data);

      expect(action.type).toEqual(UPDATE_GROUP);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(`/@groups/${id}`);
      expect(action.request.data).toEqual(data);
    });
  });
});
