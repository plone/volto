import {
  createUser,
  deleteUser,
  updateUser,
  updatePassword,
  getUser,
  listUsers,
  setInitialPassword,
  resetPassword,
} from './users';
import {
  CREATE_USER,
  DELETE_USER,
  GET_USER,
  LIST_USERS,
  UPDATE_USER,
  UPDATE_PASSWORD,
  INITIAL_PASSWORD,
  RESET_PASSWORD,
} from '../../constants/ActionTypes';

describe('Users action', () => {
  describe('createUser', () => {
    it('should create an action to add a user', () => {
      const content = 'Hello World!';
      const action = createUser(content);

      expect(action.type).toEqual(CREATE_USER);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith('/@users', { data: content });
    });
  });

  describe('deleteUser', () => {
    it('should create an action to delete a user', () => {
      const id = 'john';
      const action = deleteUser(id);

      expect(action.type).toEqual(DELETE_USER);

      const apiMock = {
        del: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.del).toBeCalledWith(`/@users/${id}`);
    });
  });

  describe('getUser', () => {
    it('should create an action to get a user', () => {
      const id = 'john';
      const action = getUser(id);

      expect(action.type).toEqual(GET_USER);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@users/${id}`);
    });
  });

  describe('listUsers', () => {
    it('should create an action to list users', () => {
      const action = listUsers();

      expect(action.type).toEqual(LIST_USERS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@users`);
    });

    it('should create an action to get users with a query', () => {
      const query = 'john';
      const action = listUsers(query);

      expect(action.type).toEqual(LIST_USERS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@users?query=${query}`);
    });
  });

  describe('updateUser', () => {
    it('should create an action to update a user', () => {
      const id = 'john';
      const user = 'Hello World!';
      const action = updateUser(id, user);

      expect(action.type).toEqual(UPDATE_USER);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(`/@users/${id}`, { data: user });
    });
  });

  describe('updatePassword', () => {
    it('should create an action to update the password', () => {
      const id = 'john';
      const oldPassword = 'verysecret';
      const newPassword = 'verysecret';
      const action = updatePassword(id, oldPassword, newPassword);

      expect(action.type).toEqual(UPDATE_PASSWORD);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(`/@users/${id}/reset-password`, {
        data: { old_password: oldPassword, new_password: newPassword },
      });
    });
  });

  describe('setInitialPassword', () => {
    it('should create an action to set the initial password', () => {
      const id = 'john';
      const resetToken = '1243';
      const newPassword = 'verysecret';
      const action = setInitialPassword(id, resetToken, newPassword);

      expect(action.type).toEqual(INITIAL_PASSWORD);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(`/@users/${id}/reset-password`, {
        data: { reset_token: resetToken, new_password: newPassword },
      });
    });
  });

  describe('resetPassword', () => {
    it('should create an action to reset the password', () => {
      const id = 'john';
      const action = resetPassword(id);

      expect(action.type).toEqual(RESET_PASSWORD);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(`/@users/${id}/reset-password`);
    });
  });
});
