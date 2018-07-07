import cookie from 'react-cookie';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import { getAuthToken, persistAuthToken } from './AuthToken';

jest.mock('react-cookie', () => ({
  load: jest.fn(() => require('jsonwebtoken').sign({ exp: 1 }, 'secret')), // eslint-disable-line global-require
  remove: jest.fn(),
  save: jest.fn(),
}));

describe('AuthToken', () => {
  describe('getAuthToken', () => {
    it('can get the auth token', () => {
      getAuthToken();
      expect(cookie.load).toBeCalledWith('auth_token');
    });
  });

  describe('persistAuthToken', () => {
    it('can set a new auth token', () => {
      const store = {
        subscribe: jest.fn(),
        getState: jest.fn(() => ({
          userSession: {
            token: jwt.sign({ exp: 2 }, 'secret'),
          },
        })),
      };
      const { token } = store.getState().userSession;

      persistAuthToken(store);
      expect(cookie.save).toBeCalledWith('auth_token', token, {
        path: '/',
        expires: new Date(jwtDecode(token).exp * 1000),
      });
    });

    it('can remove an auth token', () => {
      const store = {
        subscribe: jest.fn(),
        getState: jest.fn(() => ({
          userSession: {
            token: null,
          },
        })),
      };

      persistAuthToken(store);
      expect(cookie.remove).toBeCalledWith('auth_token', { path: '/' });
    });
  });
});
