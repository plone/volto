import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-intl-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import getRoutes from './routes';
import { Api, persistAuthToken } from './helpers';

const api = new Api();
const initialState = window.__data; // eslint-disable-line no-underscore-dangle
const store = configureStore(initialState, undefined, false, api);
const history = syncHistoryWithStore(browserHistory, store);
persistAuthToken(store);

render(
  <Provider store={store} key="provider">
    <Router
      render={props => <ReduxAsyncConnect helpers={{ api }} {...props} />}
      history={history}
    >
      {getRoutes(store)}
    </Router>
  </Provider>,
  document.getElementById('main'),
);

if (module.hot) {
  module.hot.accept();
}
