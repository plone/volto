import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { save, load } from 'redux-localstorage-simple';

import reducers from '~/reducers';

import { api, crashReporter } from '@plone/volto/middleware';

const configureStore = (initialState, history, apiHelper) => {
  const defaultMiddlewares = [
    routerMiddleware(history),
    crashReporter,
    thunk,
    api(apiHelper),
  ];
  if (__CLIENT__)
    defaultMiddlewares.push(save({ states: ['localstorage'], debounce: 500 }));

  const middlewares = composeWithDevTools(
    applyMiddleware(...defaultMiddlewares),
  );

  const ls = {
    ...(__CLIENT__ ? load({ states: ['localstorage'] }) : {}),
  };

  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    }),
    { ...initialState, ...ls },
    middlewares,
  );

  return store;
};

export default configureStore;
