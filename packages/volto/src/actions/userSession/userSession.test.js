import { login, loginRenew, logout } from './userSession';
import { LOGIN, LOGIN_RENEW, LOGOUT } from '@plone/volto/constants/ActionTypes';

describe('User session action', () => {
  describe('login', () => {
    it('should create an action to login', () => {
      const username = 'admin';
      const password = 'admin';
      const action = login(username, password);

      expect(action.type).toEqual(LOGIN);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('@login');
      expect(action.request.data).toEqual({ login: username, password });
    });
  });

  describe('loginRenew', () => {
    it('should create an action to renew the login', () => {
      const action = loginRenew();

      expect(action.type).toEqual(LOGIN_RENEW);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('@login-renew');
    });
  });

  describe('logout', () => {
    it('should create an action to logout', () => {
      const action = logout();

      expect(action.type).toEqual(LOGOUT);
    });
  });
});
