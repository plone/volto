import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerResponse } from 'http';
import express from 'express';
import { TitleWidget, Moment } from './test_loadable';
// import './config';
// import { CookiesProvider } from 'react-cookie';
// import { Provider } from 'react-intl-redux';
// import { StaticRouter } from 'react-router-dom';
// import { ReduxAsyncConnect, loadOnServer } from './helpers/AsyncConnect';

// index.js
// import './fetch-polyfill';

export async function render(opts: {
  url: string;
  head: string;
  req: express.Request;
  res: ServerResponse;
}) {
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
  // Render the app
  const appHtml = ReactDOMServer.renderToString(
    <div>
      HELLO from SSR!{' '}
      <React.Suspense>
        <TitleWidget value="The title" />
        <TitleWidget value={moment().toISOString()} />
      </React.Suspense>
    </div>,
    // <Html
    //   extractor={extractor}
    //   markup={markup}
    //   store={store}
    //   criticalCss={readCriticalCss(req)}
    //   apiPath={opts.res.locals.detectedHost || config.settings.apiPath}
    //   publicURL={opts.res.locals.detectedHost || config.settings.publicURL}
    // />,
  );

  opts.res.statusCode = 200;
  opts.res.setHeader('Content-Type', 'text/html');
  opts.res.end(`<!DOCTYPE html>${appHtml}`);
}
