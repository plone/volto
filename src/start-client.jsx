import '@plone/volto/config'; // This is the bootstrap for the global config - client side
import '@root/theme';
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
import routes from '@root/routes';
import config from '@plone/volto/registry';

import configureStore from '@plone/volto/store';
import { Api, persistAuthToken, ScrollToTop } from '@plone/volto/helpers';

export const history = createBrowserHistory({
  basename: config.settings.prefixPath,
});

function reactIntlErrorHandler(error) {
  debug('i18n')(error);
}

export default function client() {
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
  // There are some cases that the client needs to know the internal server URL
  // too, as some helpers (isInternalURL and flattenToAppURL) need to be aware of it.
  // This is specially important when the hydration of the store coming from the first SSR
  // request happens, since there all the server URLs might be the internalApiPath ones,
  // and the client should be able to take care of them properly.
  if (window.env.RAZZLE_INTERNAL_API_PATH) {
    config.settings.internalApiPath = window.env.RAZZLE_INTERNAL_API_PATH;
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
}
