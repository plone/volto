import '@plone/volto/config'; // This is the bootstrap for the global config - client side
import '~/theme';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ReduxAsyncConnect } from '@plone/volto/helpers/AsyncConnect';
import { loadableReady } from '@loadable/component';
import { CookiesProvider } from 'react-cookie';
import debug from 'debug';
import routes from '~/routes';
import config from '@plone/volto/registry';

import configureStore from '@plone/volto/store';
import { Api, persistAuthToken, ScrollToTop } from '@plone/volto/helpers';

import * as Sentry from '@sentry/browser';
import initSentry from '@plone/volto/sentry';

export const history = createBrowserHistory();

initSentry(Sentry);

function reactIntlErrorHandler(error) {
  debug('i18n')(error);
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
    window.settings = config.settings;
  }

  // Setup the client registry from the SSR response values, presents in the `window.env`
  // variable. This is key for the Seamless mode to work.
  if (window.env.apiPath) {
    config.settings.apiPath = window.env.apiPath;
  }
  if (window.env.publicURL) {
    config.settings.publicURL = window.env.publicURL;
  }
  // TODO: To be removed when the use of the legacy traverse is deprecated.
  if (window.env.RAZZLE_LEGACY_TRAVERSE) {
    config.settings.legacyTraverse = true;
  }

  loadableReady(() => {
    hydrate(
      <CookiesProvider>
        <Provider store={store}>
          <IntlProvider onError={reactIntlErrorHandler}>
            <ConnectedRouter history={history}>
              <ScrollToTop>
                <ReduxAsyncConnect routes={routes} helpers={api} />
              </ScrollToTop>
            </ConnectedRouter>
          </IntlProvider>
        </Provider>
      </CookiesProvider>,
      document.getElementById('main'),
    );
  });
};
