import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import { getAuthToken, persistAuthToken } from './AuthToken';

jest.mock('universal-cookie', () =>
  jest.fn().mockImplementation(() => ({
    get: jest
      .fn(() => require('jsonwebtoken').sign({ exp: 1 }, 'secret')) // eslint-disable-line global-require
      .mockImplementationOnce(() => null), // the first call is for anonymous, no auth_token cookie
    remove: jest.fn(),
    set: jest.fn(),
  })),
);

const cookies = new Cookies();

describe('AuthToken', () => {
  describe('anonymousAuthToken', () => {
    it('avoid unnecessary removing auth token', () => {
      const store = {
        subscribe: jest.fn(),
        getState: jest.fn(() => ({
          userSession: {
            token: null,
          },
        })),
      };
      persistAuthToken(store);
      expect(cookies.remove).not.toBeCalledWith('auth_token', { path: '/' });
    });
  });

  describe('getAuthToken', () => {
    it('can get the auth token', () => {
      getAuthToken();
      expect(cookies.get).toBeCalledWith('auth_token');
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
      expect(cookies.set).toBeCalledWith('auth_token', token, {
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
      expect(cookies.remove).toBeCalledWith('auth_token', { path: '/' });
    });
  });
});
