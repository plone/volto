import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { getAuthToken, persistAuthToken } from './AuthToken';

vi.mock('universal-cookie', () => {
  const mCookie = {
    get: vi
      .fn(() => jwt.sign({ exp: 1 }, 'secret'))
      .mockImplementationOnce(() => null),
    remove: vi.fn(),
    set: vi.fn(),
  };
  return {
    default: vi.fn(() => mCookie),
  };
});

describe('AuthToken', () => {
  let cookies;
  let mockStore;

  beforeEach(() => {
    cookies = new Cookies();
    vi.clearAllMocks();

    mockStore = {
      subscribe: vi.fn(),
      dispatch: vi.fn(),
      getState: vi.fn(() => ({
        userSession: {
          token: null,
        },
        router: {
          location: {
            pathname: '/current-path',
          },
        },
      })),
    };
  });

  describe('anonymousAuthToken', () => {
    it('avoid unnecessary removing auth token', () => {
      const store = {
        ...mockStore,
        getState: vi.fn(() => ({
          userSession: {
            token: null,
          },
          router: {
            location: {
              pathname: '/current-path',
            },
          },
        })),
      };

      persistAuthToken(store);
      expect(cookies.remove).not.toHaveBeenCalledWith('auth_token', {
        path: '/',
      });
    });
  });

  describe('getAuthToken', () => {
    it('can get the auth token', () => {
      getAuthToken();
      expect(cookies.get).toHaveBeenCalledWith('auth_token');
    });
  });

  describe('persistAuthToken', () => {
    it('can set a new auth token', () => {
      const store = {
        ...mockStore,
        getState: vi.fn(() => ({
          userSession: {
            token: jwt.sign({ exp: 2 }, 'secret'),
          },
          router: {
            location: {
              pathname: '/current-path',
            },
          },
        })),
      };
      const { token } = store.getState().userSession;

      persistAuthToken(store);
      expect(cookies.set).toHaveBeenCalledWith('auth_token', token, {
        path: '/',
        expires: new Date(jwtDecode(token).exp * 1000),
        secure: false,
      });
    });

    it('can remove an auth token', () => {
      const store = {
        ...mockStore,
        getState: vi.fn(() => ({
          userSession: {
            token: null,
          },
          router: {
            location: {
              pathname: '/current-path',
            },
          },
        })),
      };

      persistAuthToken(store);
      expect(cookies.remove).toHaveBeenCalledWith('auth_token', { path: '/' });
    });
  });
});
