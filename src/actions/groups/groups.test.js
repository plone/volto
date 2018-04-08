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
} from '../../constants/ActionTypes';

describe('Groups action', () => {
  describe('createGroup', () => {
    it('should create an action to create a group', () => {
      const data = 'group';
      const action = createGroup(data);

      expect(action.type).toEqual(CREATE_GROUP);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith('/@groups', {
        data,
      });
    });
  });

  describe('deleteGroup', () => {
    it('should create an action to delete a group', () => {
      const id = 'my-group';
      const action = deleteGroup(id);

      expect(action.type).toEqual(DELETE_GROUP);

      const apiMock = {
        del: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.del).toBeCalledWith(`/@groups/${id}`);
    });
  });

  describe('getGroup', () => {
    it('should create an action to get a group', () => {
      const id = 'my-group';
      const action = getGroup(id);

      expect(action.type).toEqual(GET_GROUP);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@groups/${id}`);
    });
  });

  describe('listGroups', () => {
    it('should create an action to list groups', () => {
      const action = listGroups();

      expect(action.type).toEqual(LIST_GROUPS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith('/@groups');
    });
  });

  describe('updateGroup', () => {
    it('should create an action to update a group', () => {
      const id = 'my-group';
      const data = 'group';
      const action = updateGroup(id, data);

      expect(action.type).toEqual(UPDATE_GROUP);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(`/@groups/${id}`, {
        data,
      });
    });
  });
});
