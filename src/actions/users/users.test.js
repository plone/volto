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
} from '@plone/volto/constants/ActionTypes';

describe('Users action', () => {
  describe('createUser', () => {
    it('should create an action to add a user', () => {
      const content = 'Hello World!';
      const action = createUser(content);

      expect(action.type).toEqual(CREATE_USER);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@users');
      expect(action.request.data).toEqual(content);
    });
  });

  describe('deleteUser', () => {
    it('should create an action to delete a user', () => {
      const id = 'john';
      const action = deleteUser(id);

      expect(action.type).toEqual(DELETE_USER);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(`/@users/${id}`);
    });
  });

  describe('getUser', () => {
    it('should create an action to get a user', () => {
      const id = 'john';
      const action = getUser(id);

      expect(action.type).toEqual(GET_USER);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@users/${id}`);
    });
  });

  describe('listUsers', () => {
    it('should create an action to list users', () => {
      const action = listUsers();

      expect(action.type).toEqual(LIST_USERS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@users');
    });

    it('should create an action to get users with a query', () => {
      const query = 'john';
      const action = listUsers({ query: query });

      expect(action.type).toEqual(LIST_USERS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@users?query=${query}`);
    });
  });

  describe('updateUser', () => {
    it('should create an action to update a user', () => {
      const id = 'john';
      const user = 'Hello World!';
      const action = updateUser(id, user);

      expect(action.type).toEqual(UPDATE_USER);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(`/@users/${id}`);
      expect(action.request.data).toEqual(user);
    });
  });

  describe('updatePassword', () => {
    it('should create an action to update the password', () => {
      const id = 'john';
      const oldPassword = 'verysecret';
      const newPassword = 'verysecret';
      const action = updatePassword(id, oldPassword, newPassword);

      expect(action.type).toEqual(UPDATE_PASSWORD);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`/@users/${id}/reset-password`);
      expect(action.request.data).toEqual({
        old_password: oldPassword,
        new_password: newPassword,
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
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`/@users/${id}/reset-password`);
      expect(action.request.data).toEqual({
        reset_token: resetToken,
        new_password: newPassword,
      });
    });
  });

  describe('resetPassword', () => {
    it('should create an action to reset the password', () => {
      const id = 'john';
      const action = resetPassword(id);

      expect(action.type).toEqual(RESET_PASSWORD);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`/@users/${id}/reset-password`);
    });
  });
});
