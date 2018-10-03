import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from '~/reducers';

import { api, crashReporter } from './middleware';

const configureStore = (initialState, history, apiHelper) => {
  const middlewares = composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      crashReporter,
      thunk,
      api(apiHelper),
    ),
  );
  const store = createStore(
    connectRouter(history)(combineReducers(reducers)),
    initialState,
    middlewares,
  );

  return store;
};

export default configureStore;
