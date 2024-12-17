import './config'; // This is the bootstrap for the global config - server side
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerResponse } from 'http';
import express from 'express';
// import { TitleWidget, Moment } from './test_loadable';
// import './config';
// import { CookiesProvider } from 'react-cookie';
import { parse as parseUrl } from 'url';
import { Provider } from 'react-intl-redux';
import { StaticRouter } from 'react-router-dom';
import { ReduxAsyncConnect, loadOnServer } from './helpers/AsyncConnect';
import Html from './helpers/Html/Html';
import { CookiesProvider } from 'react-cookie';
import Api from '@plone/volto/helpers/Api/Api';
import { persistAuthToken } from '@plone/volto/helpers/AuthToken/AuthToken';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import {
  toReactIntlLang,
  toGettextLang,
} from '@plone/volto/helpers/Utils/Utils';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { changeLanguage } from '@plone/volto/actions/language/language';
import { resetServerContext } from 'react-beautiful-dnd';
import { detect } from 'detect-browser';
import locale from 'locale';
import languages from '@plone/volto/constants/Languages.cjs';
import { createMemoryHistory } from 'history';
import configureStore from '@plone/volto/store';
import routes from './routes';
import ErrorPage from '@plone/volto/error';
import debug from 'debug';
import userSession from '@plone/volto/reducers/userSession/userSession';

import config from '@plone/volto/registry';
import serverConfig from './config/server';

// index.js
// import './fetch-polyfill';
// console.log(config);

let locales = {};

if (config.settings) {
  config.settings.supportedLanguages.forEach((lang) => {
    const langFileName = toGettextLang(lang);
    import(`../locales/${langFileName}.json`).then((locale) => {
      locales = { ...locales, [toReactIntlLang(lang)]: locale.default };
    });
  });
}

function reactIntlErrorHandler(error) {
  debug('i18n')(error);
}

export function getConfig() {
  config.settings.serverConfig = serverConfig;
  return config;
}

export async function render(opts: {
  url: string;
  head: string;
  req: express.Request;
  res: ServerResponse;
}) {
  const { req, res, url } = opts;

  // Sync the config object with the values coming from the Express server
  // detected host from headers
  if (!import.meta.env.VOLTO_API_PATH && req.headers.host) {
    config.settings.apiPath = res.locals.detectedHost;
    config.settings.publicURL = res.locals.detectedHost;
  }

  function errorHandler(error) {
    const errorPage = (
      <Provider store={store} onError={reactIntlErrorHandler}>
        <StaticRouter context={{}} location={url}>
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
      .send(`<!doctype html> ${ReactDOMServer.renderToString(errorPage)}`);
  }

  // Setups Api instance
  const api = new Api(req);
  const browserdetect = detect(req.headers['user-agent']);
  const supported = new locale.Locales(Object.keys(languages), 'en');

  const lang = toReactIntlLang(
    new locale.Locales(
      req.universalCookies.get('I18N_LANGUAGE') ||
        config.settings.defaultLanguage ||
        req.headers['accept-language'],
    )
      .best(supported)
      .toString(),
  );

  const authToken = req.universalCookies.get('auth_token');
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
    initialEntries: [url],
  });

  // Create a fake Redux store instance for the `errorHandler` to render
  // and for being used by the rest of the middlewares, if required
  const store = configureStore(initialState, history, api);
  persistAuthToken(store, req);

  // const location = new URL(url, `http://${req.headers.host}`);
  const location = parseUrl(url); // TODO: improve the parsing with above?
  loadOnServer({ store, location, routes, api })
    .then(() => {
      const initialLang =
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
        ? initialLang
        : store.getState().content.data?.language?.token ||
          config.settings.defaultLanguage;
      if (toBackendLang(initialLang) !== contentLang && url !== '/') {
        const newLang = toReactIntlLang(
          new locale.Locales(contentLang).best(supported).toString(),
        );
        store.dispatch(changeLanguage(newLang, locales[newLang], req));
      }

      const context = {};
      resetServerContext();
      const markup = ReactDOMServer.renderToString(
        <CookiesProvider cookies={req.universalCookies}>
          <Provider store={store} onError={reactIntlErrorHandler}>
            <StaticRouter context={context} location={url}>
              <React.Suspense>
                <ReduxAsyncConnect routes={routes} helpers={api} />
              </React.Suspense>
            </StaticRouter>
          </Provider>
        </CookiesProvider>,
      );
      // const markup = ReactDOMServer.renderToString(
      //   <div>
      //     HELLO from SSR!
      //     <React.Suspense>
      //       <TitleWidget value="The title" />
      //       {/* <TitleWidget value={moment().toISOString()} /> */}
      //     </React.Suspense>
      //   </div>,
      // );

      // const readCriticalCss =
      //   config.settings.serverConfig.readCriticalCss || defaultReadCriticalCss;

      // If we are showing an "old browser" warning,
      // make sure it doesn't get cached in a shared cache
      const browserdetect = store.getState().browserdetect;
      if (config.settings.notSupportedBrowsers.includes(browserdetect?.name)) {
        res.set({
          'Cache-Control': 'private',
        });
      }

      const sendHtmlResponse = (
        res,
        statusCode,
        markup,
        store,
        req,
        config,
      ) => {
        // console.log(`<!doctype html>
        //   ${ReactDOMServer.renderToString(
        //     <Html
        //       markup={markup}
        //       store={store}
        //       // criticalCss={readCriticalCss(req)}
        //       apiPath={res.locals.detectedHost || config.settings.apiPath}
        //       publicURL={res.locals.detectedHost || config.settings.publicURL}
        //     />,
        //   )}
        // `);
        res.status(statusCode).send(
          `<!doctype html>
        ${ReactDOMServer.renderToString(
          <Html
            markup={markup}
            store={store}
            // criticalCss={readCriticalCss(req)}
            apiPath={res.locals.detectedHost || config.settings.apiPath}
            publicURL={res.locals.detectedHost || config.settings.publicURL}
            headElements={opts.head}
          />,
        )}
      `,
        );
      };

      if (context.url) {
        res.redirect(flattenToAppURL(context.url));
      } else if (context.error_code) {
        res.set({
          'Cache-Control': 'no-cache',
        });
        sendHtmlResponse(res, context.error_code, markup, store, req, config);
      } else {
        sendHtmlResponse(res, 200, markup, store, req, config);
      }
    }, errorHandler)
    .catch(errorHandler);

  // const markup = ReactDOMServer.renderToString(
  //   <CookiesProvider cookies={req.universalCookies}>
  //     <Provider store={store} onError={reactIntlErrorHandler}>
  //       <StaticRouter context={context} location={req.url}>
  //         <ReduxAsyncConnect routes={routes} helpers={api} />
  //       </StaticRouter>
  //     </Provider>
  //   </CookiesProvider>,
  // );

  // const moment = (await Moment).default;

  // const context = {};
  // const markup = ReactDOMServer.renderToString(
  //   <CookiesProvider cookies={req.universalCookies}>
  //     <Provider store={store}>
  //       <StaticRouter context={context} location={req.url}>
  //         <ReduxAsyncConnect routes={routes} helpers={api} />
  //         {/* <div>
  //           HELLO from SSR! at {req.url}
  //           <React.Suspense>
  //             <TitleWidget value="The title" />
  //             <TitleWidget value={moment().toISOString()} />
  //           </React.Suspense>
  //         </div> */}
  //       </StaticRouter>
  //     </Provider>
  //   </CookiesProvider>,
  // );
  // // Render the app
  // const appHtml = ReactDOMServer.renderToString(
  //   // <div>
  //   //   HELLO from SSR!{' '}
  //   //   <React.Suspense>
  //   //     <TitleWidget value="The title" />
  //   //     <TitleWidget value={moment().toISOString()} />
  //   //   </React.Suspense>
  //   // </div>,
  //   <Html
  //     // extractor={extractor}
  //     markup={markup}
  //     store={store}
  //     // criticalCss={readCriticalCss(req)}
  //     // apiPath={opts.res.locals.detectedHost || config.settings.apiPath}
  //     // publicURL={opts.res.locals.detectedHost || config.settings.publicURL}
  //   />,
  // );

  // opts.res.statusCode = 200;
  // opts.res.setHeader('Content-Type', 'text/html');
  // opts.res.end(`<!DOCTYPE html>${appHtml}`);
}
