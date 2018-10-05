import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { Html, Api, persistAuthToken, generateSitemap } from './helpers';
import { parse as parseUrl } from 'url';
import { keys } from 'lodash';
import Raven from 'raven';

import userSession from './reducers/userSession/userSession';

import cookie, { plugToRequest } from 'react-cookie';
import ErrorPage from './error';

import locale from 'locale';

import routes from '~/routes';
import languages from './constants/Languages';
import configureStore from './store';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);


// configure localization
const supported = new locale.Locales(keys(languages), 'en');
let locales = {};

['en', 'nl', 'de'].forEach(function(lang) {
  try{
    let definition = require('~/../locales/' + lang + '.json');
    locales[lang] = definition;
  }catch(e){
    if (e.code !== 'MODULE_NOT_FOUND') {
      throw e;
    }
  }
});
console.log(Object.keys(locales));

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    plugToRequest(req, res);
    const api = new Api(req);

    const url = req.originalUrl || req.url;
    const location = parseUrl(url);

    const lang = new locale.Locales(
      cookie.load('lang') || req.headers['accept-language'],
    )
      .best(supported)
      .toString();

    const authToken = cookie.load('auth_token');

    const initialState = {
      userSession: { ...userSession(), token: authToken },
      form: req.body,
      intl: {
        defaultLocale: 'en',
        locale: lang,
        messages: locales[lang],
      },
    };
    const history = createMemoryHistory({
      initialEntries: [req.url],
    });

    // Create a new Redux store instance
    const store = configureStore(initialState, history, api);

    persistAuthToken(store);

    if (req.path === '/sitemap.xml.gz') {
      generateSitemap(req).then(sitemap => {
        res.header('Content-Type: application/x-gzip');
        res.header('Content-Encoding: gzip');
        res.header(
          'Content-Disposition: attachment; filename="sitemap.xml.gz"',
        );
        res.send(sitemap);
      });
    } else {
      loadOnServer({ store, location, routes, api })
        .then(() => {
          const context = {};
          const markup = renderToString(
            <Provider store={store}>
              <StaticRouter context={context} location={req.url}>
                <ReduxAsyncConnect routes={routes} helpers={api} />
              </StaticRouter>
            </Provider>,
          );

          if (context.url) {
            res.redirect(context.url);
          } else {
            res.status(200).send(
              `<!doctype html>
                ${renderToString(
                  <Html assets={assets} markup={markup} store={store} />,
                )}
              `,
            );
          }
        })
        .catch(error => {
          const errorPage = <ErrorPage message={error.message} />;

          if (process.env.SENTRY_DSN) {
            Raven.captureException(error.message, {
              extra: JSON.stringify(error),
            });
          }
          res.set({
            'Cache-Control': 'public, max-age=60, no-transform',
          });
          res.status(500).send(`<!doctype html> ${renderToString(errorPage)}`);
        });
    }
  });

export default server;
