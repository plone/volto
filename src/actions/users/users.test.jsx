import {
  addUser,
  deleteUser,
  editUser,
  editPassword,
  getUser,
  getUsers,
  setInitialPassword,
  resetPassword,
} from './users';
import {
  ADD_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  EDIT_USER,
  EDIT_PASSWORD,
  INITIAL_PASSWORD,
  RESET_PASSWORD,
} from '../../constants/ActionTypes';

describe('Users action', () => {
  describe('addUser', () => {
    it('should create an action to add a user', () => {
      const content = 'Hello World!';
      const action = addUser(content);

      expect(action.type).toEqual(ADD_USER);

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

  describe('getUsers', () => {
    it('should create an action to get users', () => {
      const action = getUsers();

      expect(action.type).toEqual(GET_USERS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@users`);
    });
  });

  describe('getUsers', () => {
    it('should create an action to get users with a query', () => {
      const query = 'john';
      const action = getUsers(query);

      expect(action.type).toEqual(GET_USERS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@users?query=${query}`);
    });
  });

  describe('editUser', () => {
    it('should create an action to edit a user', () => {
      const id = 'john';
      const user = 'Hello World!';
      const action = editUser(id, user);

      expect(action.type).toEqual(EDIT_USER);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(`/@users/${id}`, { data: user });
    });
  });

  describe('editPassword', () => {
    it('should create an action to edit the password', () => {
      const id = 'john';
      const oldPassword = 'verysecret';
      const newPassword = 'verysecret';
      const action = editPassword(id, oldPassword, newPassword);

      expect(action.type).toEqual(EDIT_PASSWORD);

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
