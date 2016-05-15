/**
 * Html helper.
 * @module helpers/Html
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

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
const Html = ({ assets, component, store }) => {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="en-us">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          <link href={assets.styles[style]} key={key} media="screen, projection"
            rel="stylesheet" type="text/css" charSet="UTF-8"
          />
        )}

        {/* (will be present only in development mode) */}
        {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could */}
        {/* be CurrentPage.scss. */}
        {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
        {/* ideally one could also include here the style for the current page (Home.scss, */}
        {/* About.scss, etc) */}
        { Object.keys(assets.styles).length === 0 ?
          <style dangerouslySetInnerHTML={
            { __html: require('../../theme/bootstrap.config.js') }
            }
          /> : null
        }
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={ { __html: content } } />
        <script dangerouslySetInnerHTML={
            { __html: `window.__data=${serialize(store.getState())};` }
          } charSet="UTF-8"
        />
        <script src={ assets.javascript.main } charSet="UTF-8" />
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
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
};

export default Html;
