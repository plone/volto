/**
 * Store.
 * @module store
 */

import { syncHistory } from 'react-router-redux';
import { createStore as _createStore, applyMiddleware, compose } from 'redux';

import api from './middleware/api';

/**
 * Create store.
 * @function createStore
 * @param {Object} history History object.
 * @param {Object} client Client object.
 * @param {Object} data Data object.
 * @returns {Object} Store.
 */
export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history);

  const middleware = [api(client), reduxRouterMiddleware];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    if (window.devToolsExtension) {
      finalCreateStore = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      )(_createStore);
    } else {
      finalCreateStore = compose(
        applyMiddleware(...middleware),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      )(_createStore);
    }
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducers');
  const store = finalCreateStore(reducer, data);

  reduxRouterMiddleware.listenForReplays(store);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}
