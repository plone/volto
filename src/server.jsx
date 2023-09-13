/* eslint no-console: 0 */
import '@plone/volto/config'; // This is the bootstrap for the global config - server side
import { existsSync, lstatSync, readFileSync } from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { parse as parseUrl } from 'url';
import { keys } from 'lodash';
import locale from 'locale';
import { detect } from 'detect-browser';
import path from 'path';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { resetServerContext } from 'react-beautiful-dnd';
import { CookiesProvider } from 'react-cookie';
import cookiesMiddleware from 'universal-cookie-express';
import debug from 'debug';

import routes from '@root/routes';
import config from '@plone/volto/registry';

import {
  flattenToAppURL,
  Html,
  Api,
  persistAuthToken,
  normalizeLanguageName,
  toLangUnderscoreRegion,
} from '@plone/volto/helpers';
import { changeLanguage } from '@plone/volto/actions';

import userSession from '@plone/volto/reducers/userSession/userSession';

import ErrorPage from '@plone/volto/error';

import languages from '@plone/volto/constants/Languages';

import configureStore from '@plone/volto/store';
import { ReduxAsyncConnect, loadOnServer } from './helpers/AsyncConnect';

let locales = {};

if (config.settings) {
  config.settings.supportedLanguages.forEach((lang) => {
    const langFileName = normalizeLanguageName(lang);
    import('@root/../locales/' + langFileName + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

function reactIntlErrorHandler(error) {
  debug('i18n')(error);
}

/**
 * Return the correct apiPath when needed to generate the window.env.apiPath value
 * @function calculateWindowApiPath
 * @param {Object} req The request object for server side calls.
 * @returns {string} Detected apiPath.
 */
export function calculateWindowApiPath(req) {
  const { settings } = config;
  if (__SERVER__) {
    const hostHeader = req.headers.host;
    const apiPathHeader = req.headers['x-api-path'];
    let apiPathValue = '';
    if (
      // We don't have a RAZZLE_API_PATH but there is an X-Api-Path header
      (!settings.apiPath || settings.apiPath === undefined) &&
      apiPathHeader
    ) {
      apiPathValue = apiPathHeader;
    } else if (settings.apiPath) {
      apiPathValue = settings.apiPath;
    } else {
      apiPathValue = `${req.protocol}://${hostHeader}`;
    }
    return apiPathValue;
  }
}

const supported = new locale.Locales(keys(languages), 'en');

const server = express()
  .disable('x-powered-by')
  .head('/*', function (req, res) {
    // Support for HEAD requests. Required by start-test utility in CI.
    res.send('');
  })
  .use(cookiesMiddleware());

const middleware = (config.settings.expressMiddleware || []).filter((m) => m);

server.all('*', setupServer);
if (middleware.length) server.use('/', middleware);

server.use(function (err, req, res, next) {
  if (err) {
    const { store } = res.locals;
    const errorPage = (
      <Provider store={store} onError={reactIntlErrorHandler}>
        <StaticRouter context={{}} location={req.url}>
          <ErrorPage message={err.message} />
        </StaticRouter>
      </Provider>
    );

    res.set({
      'Cache-Control': 'public, max-age=60, no-transform',
    });

    /* Displays error in console
     * TODO:
     * - get ignored codes from Plone error_log
     */
    const ignoredErrors = [301, 302, 401, 404];
    if (!ignoredErrors.includes(err.status)) console.error(err);

    res
      .status(err.status || 500) // If error happens in Volto code itself error status is undefined
      .send(`<!doctype html> ${renderToString(errorPage)}`);
  }
});

function setupServer(req, res, next) {
  console.log('setup');
  const api = new Api(req);

  const lang = new locale.Locales(
    req.universalCookies.get('I18N_LANGUAGE') ||
      config.settings.defaultLanguage ||
      req.headers['accept-language'],
  )
    .best(supported)
    .toString();

  // Minimum initial state for the fake Redux store instance
  const initialState = {
    intl: {
      defaultLocale: 'en',
      locale: lang,
      messages: locales[lang],
    },
  };

  const history = createMemoryHistory({
    initialEntries: [req.url],
  });

  // Create a fake Redux store instance for the `errorHandler` to render
  // and for being used by the rest of the middlewares, if required
  const store = configureStore(initialState, history, api);

  function errorHandler(error) {
    const errorPage = (
      <Provider store={store} onError={reactIntlErrorHandler}>
        <StaticRouter context={{}} location={req.url}>
          <ErrorPage message={error.message} />
        </StaticRouter>
      </Provider>
    );

    res.set({
      'Cache-Control': 'public, max-age=60, no-transform',
    });

    /* Displays error in console
     * TODO:
     * - get ignored codes from Plone error_log
     */
    const ignoredErrors = [301, 302, 401, 404];
    if (!ignoredErrors.includes(error.status)) console.error(error);

    res
      .status(error.status || 500) // If error happens in Volto code itself error status is undefined
      .send(`<!doctype html> ${renderToString(errorPage)}`);
  }

  if (!process.env.RAZZLE_API_PATH && req.headers.host) {
    res.locals.detectedHost = `${
      req.headers['x-forwarded-proto'] || req.protocol
    }://${req.headers.host}`;
    config.settings.publicURL = res.locals.detectedHost;
  }

  res.locals = {
    ...res.locals,
    store,
    api,
    errorHandler,
  };

  next();
}

server.get('/*', (req, res) => {
  const { errorHandler } = res.locals;

  const api = new Api(req);

  const browserdetect = detect(req.headers['user-agent']);

  const lang = new locale.Locales(
    req.universalCookies.get('I18N_LANGUAGE') ||
      config.settings.defaultLanguage ||
      req.headers['accept-language'],
  )
    .best(supported)
    .toString();

  const authToken = req.universalCookies.get('auth_token');
  const initialState = {
    userSession: {
      ...userSession(),
      token: authToken,
      apiHeaders: {
        protocol: req.protocol,
        host: req.headers.host,
        apiPath: req.headers['x-api-path'],
        internalApiPath: req.headers['x-internal-api-path'],
      },
    },
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

  persistAuthToken(store, req);

  // @loadable/server extractor
  const buildDir = process.env.BUILD_DIR || 'build';
  const extractor = new ChunkExtractor({
    statsFile: path.resolve(path.join(buildDir, 'loadable-stats.json')),
    entrypoints: ['client'],
  });

  const url = req.originalUrl || req.url;
  const location = parseUrl(url);

  loadOnServer({ store, location, routes, api })
    .then(() => {
      const cookie_lang =
        req.universalCookies.get('I18N_LANGUAGE') ||
        config.settings.defaultLanguage ||
        req.headers['accept-language'];

      // The content info is in the store at this point thanks to the asynconnect
      // features, then we can force the current language info into the store when
      // coming from an SSR request

      // TODO: there is a bug here with content that, for any reason, doesn't
      // present the language token field, for some reason. In this case, we
      // should follow the cookie rather then switching the language
      const contentLang = store.getState().content.get?.error
        ? cookie_lang
        : store.getState().content.data?.language?.token ||
          config.settings.defaultLanguage;

      if (cookie_lang !== contentLang) {
        const newLocale = toLangUnderscoreRegion(
          new locale.Locales(contentLang).best(supported).toString(),
        );
        store.dispatch(changeLanguage(newLocale, locales[newLocale], req));
      }

      const context = {};
      resetServerContext();
      const markup = renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <CookiesProvider cookies={req.universalCookies}>
            <Provider store={store} onError={reactIntlErrorHandler}>
              <StaticRouter context={context} location={req.url}>
                <ReduxAsyncConnect routes={routes} helpers={api} />
              </StaticRouter>
            </Provider>
          </CookiesProvider>
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
                  extractScripts={
                    config.settings.serverConfig.extractScripts?.errorPages ||
                    process.env.NODE_ENV !== 'production'
                  }
                  criticalCss={readCriticalCss(req)}
                  apiPath={calculateWindowApiPath(req)}
                  publicURL={
                    res.locals.detectedHost || config.settings.publicURL
                  }
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
                  apiPath={calculateWindowApiPath(req)}
                  publicURL={
                    res.locals.detectedHost || config.settings.publicURL
                  }
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

// Exposed for the console bootstrap info messages
server.apiPath = config.settings.apiPath;
server.devProxyToApiPath = config.settings.devProxyToApiPath;
server.proxyRewriteTarget = config.settings.proxyRewriteTarget;
server.publicURL = config.settings.publicURL;

export default server;
