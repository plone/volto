import { login, logout } from './userSession';
import { LOGIN, LOGOUT } from '../../constants/ActionTypes';

describe('User session action', () => {
  describe('login', () => {
    it('should create an action to login', () => {
      const username = 'admin';
      const password = 'admin';
      const action = login(username, password);

      expect(action.type).toEqual(LOGIN);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith('@login', {
        data: { login: username, password },
      });
    });
  });

  describe('logout', () => {
    it('should create an action to logout', () => {
      const action = logout();

      expect(action.type).toEqual(LOGOUT);
    });
  });
});
