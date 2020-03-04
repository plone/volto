import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import { keys } from 'lodash';
import Raven from 'raven';
import cookie, { plugToRequest } from 'react-cookie';
import locale from 'locale';
import { detect } from 'detect-browser';

import routes from '~/routes';
import nlLocale from '~/../locales/nl.json';
import deLocale from '~/../locales/de.json';
import enLocale from '~/../locales/en.json';
import jaLocale from '~/../locales/ja.json';
import ptLocale from '~/../locales/pt.json';
import ptBRLocale from '~/../locales/pt_BR.json';
import esLocale from '~/../locales/es.json';
import itLocale from '~/../locales/it.json';

import {
  Html,
  Api,
  persistAuthToken,
  generateSitemap,
  getAPIResourceWithAuth,
} from '@plone/volto/helpers';

import userSession from '@plone/volto/reducers/userSession/userSession';

import ErrorPage from '@plone/volto/error';

import languages from '@plone/volto/constants/Languages';

import configureStore from '@plone/volto/store';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const supported = new locale.Locales(keys(languages), 'en');
const locales = {
  en: enLocale,
  nl: nlLocale,
  de: deLocale,
  ja: jaLocale,
  pt: ptLocale,
  pt_BR: ptBRLocale,
  es: esLocale,
  it: itLocale,
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    plugToRequest(req, res);
    const api = new Api(req);

    const url = req.originalUrl || req.url;
    const location = parseUrl(url);

    const browserdetect = detect(req.headers['user-agent']);

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
      browserdetect,
    };
    const history = createMemoryHistory({
      initialEntries: [req.url],
    });

    // Create a new Redux store instance
    const store = configureStore(initialState, history, api);

    persistAuthToken(store);

    if (req.path === '/sitemap.xml.gz') {
      generateSitemap(req).then(sitemap => {
        res.set('Content-Type', 'application/x-gzip');
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Disposition', 'attachment; filename="sitemap.xml.gz"');
        res.send(sitemap);
      });
    } else if (
      req.path.match(/(.*)\/@@images\/(.*)/) ||
      req.path.match(/(.*)\/@@download\/(.*)/)
    ) {
      getAPIResourceWithAuth(req).then(resource => {
        res.set('Content-Type', resource.headers['content-type']);
        if (resource.headers['content-disposition']) {
          res.set(
            'Content-Disposition',
            resource.headers['content-disposition'],
          );
        }
        res.send(resource.body);
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
          const errorPage = (
            <Provider store={store}>
              <StaticRouter context={{}} location={req.url}>
                <ErrorPage message={error.message} />
              </StaticRouter>
            </Provider>
          );

          if (process.env.SENTRY_DSN) {
            Raven.captureException(error.message, {
              extra: JSON.stringify(error),
            });
          }
          res.set({
            'Cache-Control': 'public, max-age=60, no-transform',
          });

          // Displays error in console
          console.error(error);

          res.status(500).send(`<!doctype html> ${renderToString(errorPage)}`);
        });
    }
  });

export default server;
