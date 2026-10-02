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
  // The persisted reducers are only relevant for authenticated users.
  const isAuthenticated = !!initialState?.userSession?.token;
  const persistClientState = __CLIENT__ && isAuthenticated;
  let stack = [
    blacklistRoutes,
    protectLoadStart,
    routerMiddleware(history),
    thunk,
    ...(apiHelper ? [api(apiHelper)] : []),
    userSessionReset,
    protectLoadEnd,
    ...(persistClientState
      ? [
          save({
            states: config.settings.persistentReducers,
            debounce: 500,
            disableWarnings: true,
          }),
        ]
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
      ...(persistClientState
        ? load({
            states: config.settings.persistentReducers,
            disableWarnings: true,
          })
        : {}),
    },
    middlewares,
  );

  return store;
};

export default configureStore;
