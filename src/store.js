import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { save, load } from 'redux-localstorage-simple';

import reducers from '~/reducers';
import { settings } from '~/config';

import { api, crashReporter } from '@plone/volto/middleware';

const configureStore = (initialState, history, apiHelper) => {
  const middlewares = composeWithDevTools(
    applyMiddleware(
      ...[
        routerMiddleware(history),
        crashReporter,
        thunk,
        api(apiHelper),
        ...(__CLIENT__
          ? [save({ states: settings.persistentReducers, debounce: 500 })]
          : []),
      ],
    ),
  );

  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      ...reducers,
    }),
    {
      ...initialState,
      ...(__CLIENT__ ? load({ states: settings.persistentReducers }) : {}),
    },
    middlewares,
  );

  return store;
};

export default configureStore;
