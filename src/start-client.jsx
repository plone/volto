import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-intl-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from '~/routes';
import '~/theme';

import configureStore from './store';
import { Api, persistAuthToken, AnimationWrapper } from './helpers';

export const history = createBrowserHistory();

export default () => {
  const api = new Api();

  const store = configureStore(window.__data, history, api);
  persistAuthToken(store);

  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AnimationWrapper>
          <ReduxAsyncConnect routes={routes} helpers={api} />
        </AnimationWrapper>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('main'),
  );
};
