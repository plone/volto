import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-intl-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ReduxAsyncConnect } from 'redux-connect';
import nlLocaleData from 'react-intl/locale-data/nl';
import deLocaleData from 'react-intl/locale-data/de';
import enLocaleData from 'react-intl/locale-data/en';
import { addLocaleData } from 'react-intl';
import routes from '~/routes';

import 'semantic-ui-less/semantic.less';
import '../theme/themes/pastanaga/extras/extras.less';

import configureStore from './store';
import { Api, persistAuthToken, ScrollToTop } from './helpers';

export default () => {
  const history = createBrowserHistory();
  const api = new Api();

  const store = configureStore(window.__data, history, api);
  addLocaleData([...nlLocaleData, ...deLocaleData, ...enLocaleData]);
  persistAuthToken(store);

  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <ScrollToTop>
            <ReduxAsyncConnect routes={routes} helpers={api} />
          </ScrollToTop>
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('main'),
  );
};
