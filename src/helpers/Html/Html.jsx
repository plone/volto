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

const CRITICAL_CSS_TEMPLATE = `function lCss(u, m) {
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.type = 'text/css';
  l.href = u;
  l.media = m;
  document.getElementsByTagName('head')[0].appendChild(l)
}
function dCss() {
PLACEHOLDER
}
if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', dCss, false)
} else {
  window.onload=dCss
}`;

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
    const { extractor, markup, store, criticalCss } = this.props;
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
          {process.env.NODE_ENV === 'production' && criticalCss && (
            <style
              dangerouslySetInnerHTML={{ __html: this.props.criticalCss }}
            />
          )}
          {/* Add the crossorigin while in development */}
          {extractor
            .getLinkElements()
            // .filter((elem) => (!criticalCss ? true : elem.props.as !== 'style'))
            .map((elem) =>
              React.cloneElement(elem, {
                crossOrigin:
                  process.env.NODE_ENV === 'production' ? undefined : 'true',
                rel: !criticalCss
                  ? elem.props.rel
                  : elem.props.as === 'style'
                  ? 'prefetch'
                  : elem.props.rel,
              }),
            )}
          {/* Styles in development are loaded with Webpack's style-loader, in production,
              they need to be static*/}
          {process.env.NODE_ENV === 'production' &&
            !criticalCss &&
            extractor.getStyleElements()}
          {process.env.NODE_ENV === 'production' && criticalCss && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: CRITICAL_CSS_TEMPLATE.replace(
                    'PLACEHOLDER',
                    extractor
                      .getStyleElements()
                      .map((el) => `lCss('${el.props.href}', 'all');`)
                      .join('\n'),
                  ),
                }}
              ></script>
              {extractor.getStyleElements().map((elem) => (
                <noscript>
                  {React.cloneElement(elem, {
                    rel: 'stylesheet',
                    crossOrigin:
                      process.env.NODE_ENV === 'production'
                        ? undefined
                        : 'true',
                  })}
                </noscript>
              ))}
            </>
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
