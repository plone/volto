/**
 * Html helper.
 * @module helpers/Html
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
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
export const Html = ({ assets, component, store }) => {
  const content = ReactDOM.renderToString(component);
  const head = Helmet.rewind();
  const bodyClass = join(BodyClass.rewind(), ' ');

  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map(style => (
          <link
            href={assets.styles[style]}
            key={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
        ))}
        <link
          href="/assets/overrides.css"
          media="screen, projection"
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
        />
      </head>
      <body className={bodyClass}>
        <div id="toolbar" />
        <div id="main" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__data=${serialize(store.getState())};`,
          }}
          charSet="UTF-8"
        />
        {Object.keys(assets.javascript).map(script => (
          <script
            src={assets.javascript[script]}
            key={assets.javascript[script]}
            charSet="UTF-8"
          />
        ))}
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
  component: PropTypes.node.isRequired,
  store: PropTypes.shape({
    getState: PropTypes.func,
  }).isRequired,
};
