/* eslint no-console: 0 */
import '~/config'; // This is the bootstrap for the global config - server side
import { existsSync, lstatSync, readFileSync } from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import { keys } from 'lodash';
import cookie, { plugToRequest } from 'react-cookie';
import locale from 'locale';
import { detect } from 'detect-browser';
import path from 'path';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { updateIntl } from 'react-intl-redux';
import { resetServerContext } from 'react-beautiful-dnd';

import routes from '~/routes';
import config from '@plone/volto/registry';

import { flattenToAppURL } from '@plone/volto/helpers';

import { Html, Api, persistAuthToken } from '@plone/volto/helpers';

import userSession from '@plone/volto/reducers/userSession/userSession';

import ErrorPage from '@plone/volto/error';

import languages from '@plone/volto/constants/Languages';

import configureStore from '@plone/volto/store';

let locales = {};

if (config.settings) {
  config.settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

const supported = new locale.Locales(keys(languages), 'en');

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .head('/*', function (req, res) {
    // Support for HEAD requests. Required by start-test utility in CI.
    res.send('');
  });

// Internal proxy to bypass CORS while developing.
if (__DEVELOPMENT__ && config.settings.devProxyToApiPath) {
  const apiPathURL = parseUrl(config.settings.apiPath);
  const proxyURL = parseUrl(config.settings.devProxyToApiPath);
  const serverURL = `${proxyURL.protocol}//${proxyURL.host}`;
  const instancePath = proxyURL.pathname;
  server.use(
    '/api',
    createProxyMiddleware({
      target: serverURL,
      pathRewrite: {
        '^/api':
          config.settings.proxyRewriteTarget ||
          `/VirtualHostBase/http/${apiPathURL.hostname}:${apiPathURL.port}${instancePath}/VirtualHostRoot/_vh_api`,
      },
      logLevel: 'silent', // change to 'debug' to see all requests
      ...(config.settings?.proxyRewriteTarget?.startsWith('https') && {
        changeOrigin: true,
        secure: false,
      }),
    }),
  );
}

server.all('*', setupServer);

function setupServer(req, res, next) {
  plugToRequest(req, res);

  const api = new Api(req);

  const browserdetect = detect(req.headers['user-agent']);

  const lang = new locale.Locales(
    cookie.load('I18N_LANGUAGE') ||
      config.settings.defaultLanguage ||
      req.headers['accept-language'],
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

  function errorHandler(error) {
    const errorPage = (
      <Provider store={store}>
        <StaticRouter context={{}} location={req.url}>
          <ErrorPage message={error.message} />
        </StaticRouter>
      </Provider>
    );

    res.set({
      'Cache-Control': 'public, max-age=60, no-transform',
    });

    // Displays error in console
    console.error(error);

    res.status(500).send(`<!doctype html> ${renderToString(errorPage)}`);
  }

  req.app.locals = {
    ...req.app.locals,
    store,
    api,
    errorHandler,
  };

  next();
}

const expressMiddleware = (config.settings.expressMiddleware || []).filter(
  (m) => typeof m !== 'undefined',
);
if (expressMiddleware.length) server.use('/', expressMiddleware);

server.get('/*', (req, res) => {
  const { store, api, errorHandler } = req.app.locals;

  // @loadable/server extractor
  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    entrypoints: ['client'],
  });

  const url = req.originalUrl || req.url;
  const location = parseUrl(url);

  loadOnServer({ store, location, routes, api })
    .then(() => {
      // The content info is in the store at this point thanks to the asynconnect
      // features, then we can force the current language info into the store when
      // coming from an SSR request
      const updatedLang =
        store.getState().content.data?.language?.token ||
        config.settings.defaultLanguage;
      store.dispatch(
        updateIntl({
          locale: updatedLang,
          messages: locales[updatedLang],
        }),
      );

      const context = {};
      resetServerContext();
      const markup = renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              <ReduxAsyncConnect routes={routes} helpers={api} />
            </StaticRouter>
          </Provider>
        </ChunkExtractorManager>,
      );

      const readCriticalCss =
        config.settings.serverConfig.readCriticalCss || defaultReadCriticalCss;

      if (context.url) {
        res.redirect(flattenToAppURL(context.url));
      } else if (context.error_code) {
        res.set({
          'Cache-Control': 'no-cache',
        });

        res.status(context.error_code).send(
          `<!doctype html>
              ${renderToString(
                <Html
                  extractor={extractor}
                  markup={markup}
                  store={store}
                  extractScripts={process.env.NODE_ENV !== 'production'}
                  criticalCss={readCriticalCss(req)}
                />,
              )}
            `,
        );
      } else {
        res.status(200).send(
          `<!doctype html>
              ${renderToString(
                <Html
                  extractor={extractor}
                  markup={markup}
                  store={store}
                  criticalCss={readCriticalCss(req)}
                />,
              )}
            `,
        );
      }
    }, errorHandler)
    .catch(errorHandler);
});

export const defaultReadCriticalCss = () => {
  const { criticalCssPath } = config.settings.serverConfig;

  const e = existsSync(criticalCssPath);
  if (!e) return;

  const f = lstatSync(criticalCssPath);
  if (!f.isFile()) return;

  return readFileSync(criticalCssPath, { encoding: 'utf-8' });
};

server.apiPath = config.settings.apiPath;
server.devProxyToApiPath = config.settings.devProxyToApiPath;

export default server;
