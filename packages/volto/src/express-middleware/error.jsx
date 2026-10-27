/* eslint no-console: 0 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import debug from 'debug';
import ErrorPage from '@plone/volto/error';

function reactIntlErrorHandler(error) {
  debug('i18n')(error);
}

/**
 * Whether an error is worth logging: one from Volto's own code (no status) or
 * a server error. Redirects and client errors (a bad URL, a missing page) are
 * the request's doing, not the server's.
 * @function shouldLogError
 * @param {number} status HTTP status of the error, if it has one.
 * @returns {boolean} True if the error should be logged.
 */
export function shouldLogError(status) {
  return status === undefined || status >= 500;
}

/**
 * A location the router and history can take. Both decode the path, so a
 * path that is not valid percent-encoding throws there too; only an error
 * page is rendered for such a request, and it does not depend on the
 * location, so it is rendered at '/'.
 * @function decodableLocation
 * @param {string} url Request URL.
 * @returns {string} The URL, or '/' if it cannot be decoded.
 */
export function decodableLocation(url) {
  try {
    decodeURI(url);
  } catch (e) {
    if (e instanceof URIError) return '/';
    throw e;
  }
  return url;
}

/**
 * Render an error as Volto's error page and send it with the error's status.
 * @function sendErrorPage
 * @param {Error} error The error.
 * @param {Object} store The Redux store to render with.
 * @param {Object} req Express request.
 * @param {Object} res Express response.
 * @returns {undefined}
 */
export function sendErrorPage(error, store, req, res) {
  const errorPage = (
    <Provider store={store} onError={reactIntlErrorHandler}>
      <StaticRouter context={{}} location={decodableLocation(req.url)}>
        <ErrorPage message={error.message} />
      </StaticRouter>
    </Provider>
  );

  res.set({
    'Cache-Control': 'public, max-age=60, no-transform',
  });

  if (shouldLogError(error.status)) console.error(error);

  res
    .status(error.status || 500) // If error happens in Volto code itself error status is undefined
    .send(`<!doctype html> ${renderToString(errorPage)}`);
}

/**
 * Express error middleware rendering Volto's error page.
 *
 * An error can arrive before `setupServer` has run, when Express fails to
 * match the route itself (a path that is not valid percent-encoding), so
 * there may be no store in `res.locals` yet: `createStore` makes one.
 * @function errorMiddleware
 * @param {Function} createStore Creates a store for a request.
 * @returns {Function} The error middleware.
 */
export default function errorMiddleware(createStore) {
  return function (err, req, res, next) {
    const store = res.locals.store || createStore(req);
    sendErrorPage(err, store, req, res);
  };
}
