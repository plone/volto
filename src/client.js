/**
 * Client.
 * @module client
 */

import 'babel-polyfill';
import { Api } from './helpers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import createStore from './store';

import getRoutes from './routes';

const api = new Api();
const history = useScroll(() => browserHistory)();
const dest = document.getElementById('main');
const store = createStore(history, api, window.__data);

/**
 * Render method.
 * @function render
 * @param {Object} props Properties.
 * @returns {String} Markup.
 */
const render = props =>
  <ReduxAsyncConnect
    {...props}
    helpers={{ api }}
    filter={item => !item.deferred}
  />;

/**
 * Component.
 * @const component
 * @type {Object}
 */
const component = (
  <Router render={render} history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest,
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes ||
    !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. ', // eslint-disable-line no-console
      'Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest,
  );
}
