/**
 * Html helper.
 * @module helpers/Html
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { join } from 'lodash';
import { BodyClass } from '../.';

/**
 * Html class.
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 * @function Html
 * @param {Object} props Component properties.
 * @param {Object} props.assets Assets to be rendered.
 * @param {Object} props.component Content to be rendered as child node.
 * @param {Object} props.store Store object.
 * @returns {string} Markup of the not found page.
 */
export const Html = ({ assets, markup, store }) => {
  const head = Helmet.rewind();
  const bodyClass = join(BodyClass.rewind(), ' ');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {assets.client.css ? (
          <link rel="stylesheet" href={assets.client.css} />
        ) : null}
        {process.env.NODE_ENV === 'production' ? (
          <script src={assets.client.js} defer />
        ) : (
          <script src={assets.client.js} defer crossOrigin="true" />
        )}
      </head>
      <body className={bodyClass}>
        <div id="toolbar" />
        <div id="main" dangerouslySetInnerHTML={{ __html: markup }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__data=${serialize(store.getState())};`,
          }}
          charSet="UTF-8"
        />
      </body>
    </html>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Html.propTypes = {
  assets: PropTypes.shape({
    styles: PropTypes.object,
    javascript: PropTypes.shape({
      main: PropTypes.string,
    }),
  }).isRequired,
  markup: PropTypes.string.isRequired,
  store: PropTypes.shape({
    getState: PropTypes.func,
  }).isRequired,
};
