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
  const saveMiddleware = save({
    states: config.settings.persistentReducers,
    debounce: 500,
  });
  const conditionalSave = (store) => (next) => (action) => {
    const state = store.getState();
    if (state.userSession?.token) {
      return saveMiddleware(store)(next)(action);
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
    ...(__CLIENT__ ? [conditionalSave] : []),
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
      ...(__CLIENT__ && initialState?.userSession?.token
        ? load({ states: config.settings.persistentReducers })
        : {}),
    },
    middlewares,
  );

  return store;
};

export default configureStore;
