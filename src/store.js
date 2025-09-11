import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
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
} from '@plone/volto/middleware';

/**
 * Creates a conditional localStorage middleware that only persists state
 * when the user is authenticated or during authentication flows
 */
const createConditionalSaveMiddleware = () => {
  const saveMiddleware = save({ 
    states: config.settings.persistentReducers, 
    debounce: 500 
  });
  
  return (store) => {
    const wrappedSaveMiddleware = saveMiddleware(store);
    
    return (next) => (action) => {
      const state = store.getState();

      console.log('userSession:', state?.userSession);
      console.log('token:', state?.userSession?.token || state?.users?.user?.token);
      console.log('user id:', state?.users);

      
      // Check if user is authenticated or in authentication process
      const isAuthenticated = !!(
        state?.userSession?.token || 
        state?.users?.user?.token || 
        state?.users?.user?.id ||
        state?.userSession?.user?.id
      );

      console.log('action type:', action.type);

      // Check if this is an authentication-related action
      const isAuthAction = action.type && (
        action.type.includes('LOGIN') ||
        action.type.includes('AUTH') ||
        action.type.includes('OIDC') ||
        action.type.includes('SESSION')
      );
      
      // Allow persistence if authenticated or during auth flow
      if (isAuthenticated || isAuthAction) {
        return wrappedSaveMiddleware(next)(action);
      }
      
      // For anonymous users, skip the save middleware
      return next(action);
    };
  };
};

const configureStore = (initialState, history, apiHelper) => {
  let stack = [
    blacklistRoutes,
    protectLoadStart,
    routerMiddleware(history),
    thunk,
    ...(apiHelper ? [api(apiHelper)] : []),
    protectLoadEnd,
    ...(__CLIENT__
      ? [createConditionalSaveMiddleware()]
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
