import createLogger from 'redux-logger';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { api, crashReporter } from './middleware';
import reducers from './reducers';

/**
 * AddToMiddleWare.
 * @function addToMiddleWare
 * @param {Array} data Middleware Array
 * @param {Object} logger Logger instance
 * @returns {Array} middleware.
 */
const addToMiddleWare = (data, logger) => {
  if (!__DEBUG__) {
    return data;
  }
  const devTools =
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f;
  const debugLogger = logger ? applyMiddleware(createLogger()) : f => f;
  return [...data, devTools, debugLogger];
};

/**
 * Configure store.
 * @function configureStore
 * @param {Object} initialState state object
 * @param {Object} history state object
 * @param {bool} logger showLogger
 * @param {Object} apiHelper ApiHelper
 * @returns {Object} Store.
 */
export default function configureStore(
  initialState,
  history,
  logger,
  apiHelper,
) {
  const middlewares = addToMiddleWare(
    [
      applyMiddleware(
        routerMiddleware(history),
        crashReporter,
        thunk,
        api(apiHelper),
      ),
    ],
    logger,
  );

  const createStoreWithMiddleware = compose(...middlewares)(createStore);
  const store = createStoreWithMiddleware(
    connectRouter(history)(combineReducers(reducers)),
    initialState,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index'); // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
