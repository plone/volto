import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { save, load } from 'redux-localstorage-simple';

import config from '@plone/volto/registry';
import reducers from '@root/reducers';

import {
  api,
  blacklistRoutes,
  protectLoadStart,
  protectLoadEnd,
  loadProtector,
  userSessionReset,
} from '@plone/volto/middleware';

const configureStore = (initialState, history, apiHelper) => {
  // Reducers that should only persist for authenticated users
  const authOnlyReducers = ['blocksClipboard'];

  // Filter out auth-only reducers to get always-persist reducers
  const alwaysReducers = config.settings.persistentReducers.filter(
    (r) => !authOnlyReducers.includes(r),
  );

  // Filter auth-only reducers to only include those in persistentReducers
  const activeAuthOnlyReducers = authOnlyReducers.filter((r) =>
    config.settings.persistentReducers.includes(r),
  );

  // Save middleware for always-persist reducers (unconditional)
  const alwaysSaveMiddleware = alwaysReducers.length
    ? save({ states: alwaysReducers, debounce: 500 })
    : null;

  // Save middleware for auth-only reducers (conditional on authentication)
  const authOnlySaveMiddleware = activeAuthOnlyReducers.length
    ? save({ states: activeAuthOnlyReducers, debounce: 500 })
    : null;

  // Conditional middleware that only saves auth-only reducers when user is authenticated
  const conditionalAuthOnlySave = (store) => (next) => (action) => {
    const state = store.getState();
    if (state.userSession?.token && authOnlySaveMiddleware) {
      return authOnlySaveMiddleware(store)(next)(action);
    }
    return next(action);
  };

  let stack = [
    blacklistRoutes,
    protectLoadStart,
    routerMiddleware(history),
    thunk,
    ...(apiHelper ? [api(apiHelper)] : []),
    userSessionReset,
    protectLoadEnd,
    // Always-persist reducers save unconditionally
    ...(__CLIENT__ && alwaysSaveMiddleware ? [alwaysSaveMiddleware] : []),
    // Auth-only reducers save conditionally
    ...(__CLIENT__ && activeAuthOnlyReducers.length
      ? [conditionalAuthOnlySave]
      : []),
  ];
  stack = config.settings.storeExtenders.reduce(
    (acc, extender) => extender(acc),
    stack,
  );
  const middlewares = composeWithDevTools(applyMiddleware(...stack));
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
      ...config.addonReducers,
      loadProtector,
    }),
    {
      ...initialState,
      ...(__CLIENT__
        ? {
            // Always load always-persist reducers
            ...(alwaysReducers.length ? load({ states: alwaysReducers }) : {}),
            // Only load auth-only reducers if user has token
            ...(initialState?.userSession?.token &&
            activeAuthOnlyReducers.length
              ? load({ states: activeAuthOnlyReducers })
              : {}),
          }
        : {}),
    },
    middlewares,
  );

  return store;
};

export default configureStore;
