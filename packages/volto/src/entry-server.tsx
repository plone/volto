import './config'; // This is the bootstrap for the global config - server side
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerResponse } from 'http';
import express from 'express';
import { TitleWidget, Moment } from './test_loadable';
// import './config';
// import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-intl-redux';
import { StaticRouter } from 'react-router-dom';
import { ReduxAsyncConnect } from './helpers/AsyncConnect';
import Html from './helpers/Html/Html';
import { CookiesProvider } from 'react-cookie';
import Api from '@plone/volto/helpers/Api/Api';
import {
  toReactIntlLang,
  toGettextLang,
} from '@plone/volto/helpers/Utils/Utils';
import { detect } from 'detect-browser';
import locale from 'locale';
import languages from '@plone/volto/constants/Languages.cjs';
import { createMemoryHistory } from 'history';
import configureStore from '@plone/volto/store';
import routes from './routes';

import config from '@plone/volto/registry';

// index.js
// import './fetch-polyfill';
// console.log(config);

let locales = {};

if (config.settings) {
  config.settings.supportedLanguages.forEach((lang) => {
    const langFileName = toGettextLang(lang);
    import(/* @vite-ignore */ '../locales/' + langFileName + '.json').then(
      (locale) => {
        locales = { ...locales, [toReactIntlLang(lang)]: locale.default };
      },
    );
  });
}

export async function render(opts: {
  url: string;
  head: string;
  req: express.Request;
  res: ServerResponse;
}) {
  const { req } = opts;

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

  // const markup = ReactDOMServer.renderToString(
  //   <CookiesProvider cookies={req.universalCookies}>
  //     <Provider store={store} onError={reactIntlErrorHandler}>
  //       <StaticRouter context={context} location={req.url}>
  //         <ReduxAsyncConnect routes={routes} helpers={api} />
  //       </StaticRouter>
  //     </Provider>
  //   </CookiesProvider>,
  // );

  const moment = (await Moment).default;

  const context = {};
  const markup = ReactDOMServer.renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <ReduxAsyncConnect routes={routes} helpers={api} />
          {/* <div>
            HELLO from SSR! at {req.url}
            <React.Suspense>
              <TitleWidget value="The title" />
              <TitleWidget value={moment().toISOString()} />
            </React.Suspense>
          </div> */}
        </StaticRouter>
      </Provider>
    </CookiesProvider>,
  );
  // Render the app
  const appHtml = ReactDOMServer.renderToString(
    // <div>
    //   HELLO from SSR!{' '}
    //   <React.Suspense>
    //     <TitleWidget value="The title" />
    //     <TitleWidget value={moment().toISOString()} />
    //   </React.Suspense>
    // </div>,
    <Html
      // extractor={extractor}
      markup={markup}
      store={store}
      // criticalCss={readCriticalCss(req)}
      // apiPath={opts.res.locals.detectedHost || config.settings.apiPath}
      // publicURL={opts.res.locals.detectedHost || config.settings.publicURL}
    />,
  );

  opts.res.statusCode = 200;
  opts.res.setHeader('Content-Type', 'text/html');
  opts.res.end(`<!DOCTYPE html>${appHtml}`);
}
