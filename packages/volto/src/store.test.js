import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import configureStore from './store';

const mockAuthOnlySaveMiddleware = vi.fn(
  (store) => (next) => (action) => next(action),
);
const mockAlwaysSaveMiddleware = vi.fn(
  (store) => (next) => (action) => next(action),
);

vi.mock('redux-localstorage-simple', () => ({
  save: vi.fn(({ states }) => {
    // Return different mock middlewares based on which reducers are being saved
    if (states.includes('blocksClipboard')) {
      return mockAuthOnlySaveMiddleware;
    }
    return mockAlwaysSaveMiddleware;
  }),
  load: vi.fn(() => ({})),
}));

// Mock dependencies
vi.mock(
  '@plone/volto/registry',
  () => ({
    default: {
      settings: {
        // Include both blocksClipboard (auth-only) and testReducer (always-persist)
        persistentReducers: ['blocksClipboard', 'testReducer'],
        storeExtenders: [],
        addonReducers: {},
      },
      addonReducers: {},
    },
  }),
  { virtual: true },
);

vi.mock(
  '@root/reducers',
  () => ({
    default: { userSession: (state = {}, action) => state },
  }),
  { virtual: true },
);

vi.mock(
  '@plone/volto/middleware',
  () => ({
    api: () => (store) => (next) => (action) => next(action),
    blacklistRoutes: (store) => (next) => (action) => next(action),
    protectLoadStart: (store) => (next) => (action) => next(action),
    protectLoadEnd: (store) => (next) => (action) => next(action),
    loadProtector: (state = {}, action) => state,
    userSessionReset: (store) => (next) => (action) => next(action),
  }),
  { virtual: true },
);

// Mock history
const mockHistory = {
  createHref: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
  listen: vi.fn(),
  location: { pathname: '/' },
};

describe('Store Persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.__CLIENT__ = true;
  });

  afterEach(() => {
    delete global.__CLIENT__;
  });

  describe('blocksClipboard (auth-only reducer)', () => {
    it('should NOT persist for anonymous users (no token)', () => {
      const store = configureStore(
        { userSession: { token: null } },
        mockHistory,
      );

      store.dispatch({ type: 'TEST_ACTION' });

      // blocksClipboard middleware should NOT be called for anonymous users
      expect(mockAuthOnlySaveMiddleware).not.toHaveBeenCalled();
    });

    it('should persist for authenticated users (has token)', () => {
      const store = configureStore(
        { userSession: { token: 'valid-token' } },
        mockHistory,
      );

      store.dispatch({ type: 'TEST_ACTION' });

      // blocksClipboard middleware SHOULD be called for authenticated users
      expect(mockAuthOnlySaveMiddleware).toHaveBeenCalled();
    });
  });

  describe('other reducers (always-persist)', () => {
    it('should persist for anonymous users', () => {
      const store = configureStore(
        { userSession: { token: null } },
        mockHistory,
      );

      store.dispatch({ type: 'TEST_ACTION' });

      // testReducer middleware SHOULD be called even for anonymous users
      expect(mockAlwaysSaveMiddleware).toHaveBeenCalled();
    });

    it('should persist for authenticated users', () => {
      const store = configureStore(
        { userSession: { token: 'valid-token' } },
        mockHistory,
      );

      store.dispatch({ type: 'TEST_ACTION' });

      // testReducer middleware SHOULD be called for authenticated users
      expect(mockAlwaysSaveMiddleware).toHaveBeenCalled();
    });
  });
});
