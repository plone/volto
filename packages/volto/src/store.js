import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { save, load } from 'redux-localstorage-simple';

import config from '@plone/volto/registry';
import reducers from './reducers';

import {
  api,
  blacklistRoutes,
  protectLoadStart,
  protectLoadEnd,
  loadProtector,
  userSessionReset,
} from '@plone/volto/middleware';

const configureStore = (initialState, history, apiHelper) => {
  let stack = [
    blacklistRoutes,
    protectLoadStart,
    routerMiddleware(history),
    thunk,
    ...(apiHelper ? [api(apiHelper)] : []),
    userSessionReset,
    protectLoadEnd,
    ...(!import.meta.env.SSR
      ? [save({ states: config.settings.persistentReducers, debounce: 500 })]
      : []),
  ];
  stack = config.settings.storeExtenders.reduce(
    (acc, extender) => extender(acc),
    stack,
  );
  const middlewares = !import.meta.env.SSR
    ? composeWithDevTools(applyMiddleware(...stack))
    : applyMiddleware(...stack);

  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
      ...config.addonReducers,
      loadProtector,
    }),
    {
      ...initialState,
      ...(!import.meta.env.SSR
        ? load({ states: config.settings.persistentReducers })
        : {}),
    },
    middlewares,
  );

  return store;
};

export default configureStore;
