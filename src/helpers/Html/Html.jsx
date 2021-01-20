/**
 * Html helper.
 * @module helpers/Html
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import serialize from 'serialize-javascript';
import { join } from 'lodash';
import { BodyClass } from '@plone/volto/helpers';
import { runtimeConfig } from '@plone/volto/runtime_config';

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

/**
 * Html class.
 * @class Html
 * @extends Component
 */
class Html extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    extractor: PropTypes.shape({
      getLinkElements: PropTypes.func.isRequired,
      getScriptElements: PropTypes.func.isRequired,
      getStyleElements: PropTypes.func.isRequired,
    }).isRequired,
    markup: PropTypes.string.isRequired,
    store: PropTypes.shape({
      getState: PropTypes.func,
    }).isRequired,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { extractor, markup, store } = this.props;
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

          <script
            dangerouslySetInnerHTML={{
              __html: `window.env = ${serialize(runtimeConfig)};`,
            }}
          />

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="generator" content="Volto - http://plone.org" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {/* Add the crossorigin while in development */}
          {extractor.getLinkElements().map((elem) =>
            React.cloneElement(elem, {
              crossOrigin:
                process.env.NODE_ENV === 'production' ? undefined : 'true',
            }),
          )}
          {/* Styles in development are loaded with Webpack's style-loader, in production,
              they need to be static*/}
          {process.env.NODE_ENV === 'production' && (
            <>{extractor.getStyleElements()}</>
          )}
        </head>
        <body className={bodyClass}>
          <div role="navigation" aria-label="Toolbar" id="toolbar" />
          <div id="main" dangerouslySetInnerHTML={{ __html: markup }} />
          <div id="sidebar" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${serialize(store.getState())};`,
            }}
            charSet="UTF-8"
          />
          {/* Add the crossorigin while in development */}
          {this.props.extractScripts !== false
            ? extractor.getScriptElements().map((elem) =>
                React.cloneElement(elem, {
                  crossOrigin:
                    process.env.NODE_ENV === 'production' ? undefined : 'true',
                }),
              )
            : ''}
        </body>
      </html>
    );
  }
}

export default Html;
