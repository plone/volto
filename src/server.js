/**
 * Server.
 * @module server
 */

import compression from 'compression';
import Express from 'express';
import http from 'http';
import path from 'path';
import PrettyError from 'pretty-error';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { match } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import favicon from 'serve-favicon';
import debugLogger from 'debug-logger';

import config from 'config';
import { Api, Html } from 'helpers';
import getRoutes from 'routes';
import createStore from 'store';

const debug = debugLogger('mosaic:server');
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }
  const api = new Api(req);
  const history = createHistory(req.originalUrl);

  const store = createStore(history, api);

  /**
   * Hydrate on client
   * @function hydrateOnClient
   * @returns {undefined}
   */
  function hydrateOnClient() {
    res.send(
      `<!doctype html>
${ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`
    );
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({
    history,
    routes: getRoutes(store),
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      debug.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: { api } }).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        res.send(
          `<!doctype html>
${ReactDOM.renderToString(
            <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
          )}`
        );
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      debug.error(err);
    }
    debug.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  debug.error('==>     ERROR: No PORT environment variable has been specified');
}
