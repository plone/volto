import cookie from 'react-cookie';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

import { getAuthToken, persistAuthToken } from './AuthToken';

const store = {
  subscribe: jest.fn(),
  getState: jest.fn(() => ({
    userSession: {
      token: jwt.sign({ exp: 2 }, 'secret'),
    }
  })),
}

jest.mock(
  'react-cookie',
  () => ({
    load: jest.fn(() => require('jsonwebtoken').sign({ exp: 1}, 'secret')),
    remove: jest.fn(),
    save: jest.fn(),
  }),
);

test('get auth token', () => {
  getAuthToken();
  expect(cookie.load).toBeCalledWith('auth_token');
});

test('set same auth token', () => {
  const store = {
    subscribe: jest.fn(),
    getState: jest.fn(() => ({
      userSession: {
        token: jwt.sign({ exp: 1 }, 'secret'),
      },
    })),
  };
  const token = store.getState().userSession.token;

  persistAuthToken(store);
  expect(cookie.save).toHaveBeenCalledTimes(0);
});

test('set new auth token', () => {
  const store = {
    subscribe: jest.fn(),
    getState: jest.fn(() => ({
      userSession: {
        token: jwt.sign({ exp: 2 }, 'secret'),
      },
    })),
  };
  const token = store.getState().userSession.token;

  persistAuthToken(store);
  expect(cookie.save).toBeCalledWith(
    'auth_token',
    token,
    {
      path: '/',
      expires: new Date(jwtDecode(token).exp * 1000),
    },
  );
});

test('remove auth token', () => {
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
