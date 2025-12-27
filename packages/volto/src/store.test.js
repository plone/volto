import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import configureStore from './store';

const mockSaveMiddleware = vi.fn((store) => (next) => (action) => next(action));

vi.mock('redux-localstorage-simple', () => ({
  save: vi.fn(() => mockSaveMiddleware),
  load: vi.fn(() => ({})),
}));

// Mock dependencies
vi.mock(
  '@plone/volto/registry',
  () => ({
    default: {
      settings: {
        persistentReducers: ['testReducer'],
        storeExtenders: [],
        addonReducers: {}, // Ensure this exists
      },
      addonReducers: {},
    },
  }),
  { virtual: true },
);

vi.mock(
  '@root/reducers',
  () => ({
    default: { userSession: (state = {}, action) => state }, // reducers is usually an object of reducers
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
    // Define global __CLIENT__
    global.__CLIENT__ = true;
  });

  afterEach(() => {
    delete global.__CLIENT__;
  });

  it('should NOT invoke save middleware when user is anonymous (no token)', () => {
    // Reducers need to be an object for combineReducers?
    // In store.js: import reducers from '@root/reducers'; ... combineReducers({ ...reducers })
    // So @root/reducers mock should export an object containing reducers.

    const store = configureStore(
      {
        userSession: { token: null },
      },
      mockHistory,
    );

    store.dispatch({ type: 'TEST_ACTION' });

    // Before fix: This will fail (it will be called)
    // After fix: This should pass
    expect(mockSaveMiddleware).not.toHaveBeenCalled();
  });

  it('should invoke save middleware when user is authenticated (has token)', () => {
    const store = configureStore(
      {
        userSession: { token: 'valid-token' },
      },
      mockHistory,
    );

    store.dispatch({ type: 'TEST_ACTION' });

    expect(mockSaveMiddleware).toHaveBeenCalled();
  });
});
