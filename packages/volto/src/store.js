import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { load } from 'redux-localstorage-simple';

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
import persistOnChange from '@plone/volto/middleware/persistOnChange';

const configureStore = (initialState, history, apiHelper) => {
  let stack = [
    blacklistRoutes,
    protectLoadStart,
    routerMiddleware(history),
    thunk,
    ...(apiHelper ? [api(apiHelper)] : []),
    userSessionReset,
    protectLoadEnd,
    ...(__CLIENT__
      ? [
          persistOnChange({
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
      ...(__CLIENT__
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
