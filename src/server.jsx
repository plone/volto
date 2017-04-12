// server
// import path from 'path';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import expressHealthcheck from 'express-healthcheck';
import debugLogger from 'debug-logger';
import frameguard from 'frameguard';
import React from 'react';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, createMemoryHistory, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import cookie, { plugToRequest } from 'react-cookie';
import { urlencoded } from 'body-parser';

import { Html, Api, persistAuthToken } from './helpers';
import ErrorPage from './error';
import getRoutes from './routes';
import configureStore from './store';
import config from './config';
import userSession from './reducers/userSession/userSession';

// Debug
const debug = debugLogger('plone-react:server');

export default (parameters) => {
  const app = express();
  const server = http.Server(app);
  const io = new SocketIO(server);
  const staticPath = __dirname;

  io.on('connection', socket => {
    console.log('user connected');
  });

  app.use(frameguard({ action: 'deny' }));
  app.use(urlencoded({ extended: false }));

  // Serve static files
  app.use(express.static(__dirname));
  app.use('/assets', express.static(__dirname));

  app.use('/healthcheck', expressHealthcheck());

  // React application rendering
  app.use((req, res) => {
    plugToRequest(req, res);
    const api = new Api(req);
    const authToken = cookie.load('auth_token');
    const initialState = {
      userSession: { ...userSession(), token: authToken },
      form: req.body,
    };
    const memoryHistory = createMemoryHistory(req.path);
    const store = configureStore(initialState, memoryHistory, false, api);
    persistAuthToken(store);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({
      history,
      routes: getRoutes(store),
      location: req.originalUrl,
    }, (err, redirectInfo, routeState) => { // eslint-disable-line complexity
      if (redirectInfo && redirectInfo.redirectInfo) {
        res.redirect(redirectInfo.path);
      } else if (err) {
        res.error(err.message);
      } else {
        if (routeState) { // eslint-disable-line no-lonely-if
          if (__SSR__) {
            loadOnServer({ ...routeState, store })
              .then(() => {
                const component = <Provider store={store}><ReduxAsyncConnect {...routeState} /></Provider>; // eslint-disable-line max-len
                res.set({ 'Cache-Control': 'public, max-age=600, no-transform' });
                res.status(200).send(`<!doctype html> ${renderToStaticMarkup(<Html assets={parameters.chunks()} component={component} store={store} staticPath={staticPath} />)}`);
              })
              .catch((error) => {
                const errorPage = <ErrorPage message={error.message} />;
                res.set({ 'Cache-Control': 'public, max-age=60, no-transform' });
                res.status(500).send(`<!doctype html> ${renderToStaticMarkup(errorPage)}`);
              });
          } else {
            const component = <Provider store={store}><RouterContext {...routeState} /></Provider>; // eslint-disable-line max-len
            res.set({ 'Cache-Control': 'public, max-age=60, no-transform' });
            res.status(200).send(`<!doctype html> ${renderToStaticMarkup(<Html assets={parameters.chunks()} component={component} store={store} staticPath={staticPath} />)}`);
          }
        } else {
          res.set({ 'Cache-Control': 'public, max-age=3600, no-transform' });
          res.sendStatus(404);
        }
      }
    });
  });

  // Start the HTTP server
  app.listen(config.port, (err) => {
    if (err) {
      debug.error(err);
    } else {
      debug.info('==> 🚧  Webpack development server listening on port %s', config.port);
    }
  });
};
