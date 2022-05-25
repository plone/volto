import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { save, load } from 'redux-localstorage-simple';

import config from '@plone/volto/registry';
import reducers from '@root/reducers';

import { api, crashReporter, blacklistRoutes } from '@plone/volto/middleware';
import {
  protectLoadStart,
  protectLoadEnd,
  loadProtector,
} from './storeProtectLoadUtils';

const configureStore = (initialState, history, apiHelper) => {
  let stack = [
    blacklistRoutes,
    protectLoadStart,
    routerMiddleware(history),
    crashReporter,
    thunk,
    ...(apiHelper ? [api(apiHelper)] : []),
    protectLoadEnd,
    ...(__CLIENT__
      ? [save({ states: config.settings.persistentReducers, debounce: 500 })]
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
        ? load({ states: config.settings.persistentReducers })
        : {}),
    },
    middlewares,
  );

  return store;
};

export default configureStore;
