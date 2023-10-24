/**
 * Html helper.
 * @module helpers/Html
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import serialize from 'serialize-javascript';
import { join } from 'lodash';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import { runtimeConfig } from '@plone/volto/runtime_config';
import config from '@plone/volto/registry';

const CRITICAL_CSS_TEMPLATE = `function alter() {
  document.querySelectorAll("head link[rel='prefetch']").forEach(function(el) { el.rel = 'stylesheet'});
}
if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', alter, false)
} else {
  window.onload=alter
}`;

export const loadReducers = (state = {}) => {
  const { settings } = config;
  return Object.assign(
    {},
    ...Object.keys(state).map((name) =>
      settings.initialReducersBlacklist.includes(name)
        ? {}
        : { [name]: state[name] },
    ),
  );
};

/**
 * Html class.
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 *
 * Critical.css behaviour: when a file `public/critical.css` is present, the
 * loading of stylesheets is changed. The styles in critical.css are inlined in
 * the generated HTML, and the whole story needs to change completely: instead
 * of treating stylesheets as priority for rendering, we want to defer their
 * loading as much as possible. So we change the stylesheets to be prefetched
 * and we switch their rel back to stylesheets at document ready event.
 *
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
    const {
      extractor,
      markup,
      store,
      criticalCss,
      apiPath,
      publicURL,
    } = this.props;
    const head = Helmet.rewind();
    const bodyClass = join(BodyClass.rewind(), ' ');
    const htmlAttributes = head.htmlAttributes.toComponent();

    return (
      <html lang={htmlAttributes.lang}>
        <head>
          <meta charSet="utf-8" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <script
            dangerouslySetInnerHTML={{
              __html: `window.env = ${serialize({
                ...runtimeConfig,
                // Seamless mode requirement, the client need to know where the API is located
                // if not set in the API_PATH
                ...(apiPath && {
                  apiPath,
                }),
                ...(publicURL && {
                  publicURL,
                }),
              })};`,
            }}
          />

          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="generator" content="Plone 6 - https://plone.org" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {process.env.NODE_ENV === 'production' && criticalCss && (
            <style
              dangerouslySetInnerHTML={{ __html: this.props.criticalCss }}
            />
          )}
          {/* Add the crossorigin while in development */}
          {extractor.getLinkElements().map((elem) =>
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
          {process.env.NODE_ENV === 'production' ? (
            criticalCss ? (
              <>
                <script
                  dangerouslySetInnerHTML={{
                    __html: CRITICAL_CSS_TEMPLATE,
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
            ) : (
              extractor.getStyleElements()
            )
          ) : undefined}
        </head>
        <body className={bodyClass}>
          <div role="navigation" aria-label="Toolbar" id="toolbar" />
          <div id="main" dangerouslySetInnerHTML={{ __html: markup }} />
          <div role="complementary" aria-label="Sidebar" id="sidebar" />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${serialize(
                loadReducers(store.getState()),
              )};`,
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
