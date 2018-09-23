import 'babel-polyfill';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-intl-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import nlLocaleData from 'react-intl/locale-data/nl';
import deLocaleData from 'react-intl/locale-data/de';
import enLocaleData from 'react-intl/locale-data/en';
import { addLocaleData } from 'react-intl';
import 'semantic-ui-less/semantic.less';

import configureStore from './store';
import getRoutes from './routes';
import { Api, persistAuthToken } from './helpers';

const api = new Api();
const initialState = window.__data; // eslint-disable-line no-underscore-dangle
const history = createBrowserHistory();
const store = configureStore(initialState, history, false, api);
addLocaleData([...nlLocaleData, ...deLocaleData, ...enLocaleData]);
persistAuthToken(store);

hydrate(
  <Provider store={store} key="provider">
    <ConnectedRouter
      render={props => <ReduxAsyncConnect helpers={{ api }} {...props} />}
      history={history}
    >
      {getRoutes(store)}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main'),
);

if (module.hot) {
  module.hot.accept();
}
