import { getUser, editUser, editPassword } from './users';
import {
  GET_USER,
  EDIT_USER,
  EDIT_PASSWORD,
} from '../../constants/ActionTypes';

describe('Users action', () => {
  describe('getEdit', () => {
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
});
