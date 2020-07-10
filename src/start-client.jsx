import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-intl-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ReduxAsyncConnect } from 'redux-connect';
import { loadableReady } from '@loadable/component';
import routes from '~/routes';
import { settings } from '~/config';
import '~/theme';

import configureStore from '@plone/volto/store';
import { Api, persistAuthToken, ScrollToTop } from '@plone/volto/helpers';

import * as Sentry from '@sentry/browser';

export const history = createBrowserHistory();

if (__SENTRY__) {
  Sentry.init({ dsn: __SENTRY__.SENTRY_DSN });
  if (__SENTRY__.SENTRY_CONFIG !== undefined) {
    if (__SENTRY__.SENTRY_CONFIG.tags !== undefined) {
      Sentry.setTags(__SENTRY__.SENTRY_CONFIG.tags);
    }
    if (__SENTRY__.SENTRY_CONFIG.extras !== undefined) {
      Sentry.setExtras(__SENTRY__.SENTRY_CONFIG.extras);
    }
  }
}

export default () => {
  const api = new Api();

  const store = configureStore(window.__data, history, api);
  persistAuthToken(store);

  // On Cypress we expose the history, the store and the settings
  // so we can access from Cypress and manipulate them
  if (window.Cypress) {
    window.appHistory = history;
    window.store = store;
    window.settings = settings;
  }

  loadableReady(() => {
    hydrate(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ScrollToTop>
            <ReduxAsyncConnect routes={routes} helpers={api} />
          </ScrollToTop>
        </ConnectedRouter>
      </Provider>,
      document.getElementById('main'),
    );
  });
};
