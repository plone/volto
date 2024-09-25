/**
 * Diff field component.
 * @module components/manage/Diff/DiffField
 */

import React from 'react';
import { join, map } from 'lodash';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-intl-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { Api } from '@plone/volto/helpers';
import configureStore from '@plone/volto/store';
import { RenderBlocks } from '@plone/volto/components';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

/**
 * Helper function to handle repetitive value checks and formatting.
 */

/**
 * Improved formatDiffPart function that handles HTML tags correctly.
 */

const isHtmlTag = (str) => {
  // Match complete HTML tags, including:
  // 1. Opening tags like <div>, <img src="example" />, <svg>...</svg>
  // 2. Self-closing tags like <img />, <br />
  // 3. Closing tags like </div>
  return /^<([a-zA-Z]+[0-9]*)\b[^>]*>|^<\/([a-zA-Z]+[0-9]*)\b[^>]*>$|^<([a-zA-Z]+[0-9]*)\b[^>]*\/>$/.test(
    str,
  );
};
const splitWords = (str) => {
  if (typeof str !== 'string') return str;
  if (!str) return [];

  const result = [];
  let currentWord = '';
  let insideTag = false;
  let insideSpecialTag = false;
  let tagBuffer = '';

  // Special tags that should not be split (e.g., <img />, <svg> ... </svg>)
  const specialTags = ['img', 'svg'];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // Start of an HTML tag
    if (char === '<') {
      if (currentWord) {
        result.push(currentWord); // Push text before the tag
        currentWord = '';
      }
      insideTag = true;
      tagBuffer += char;
    }
    // End of an HTML tag
    else if (char === '>') {
      tagBuffer += char;
      insideTag = false;

      // Check if the tagBuffer contains a special tag
      const tagNameMatch = tagBuffer.match(/^<\/?([a-zA-Z]+[0-9]*)\b/);
      if (tagNameMatch && specialTags.includes(tagNameMatch[1])) {
        insideSpecialTag =
          tagNameMatch[0].startsWith('<') && !tagNameMatch[0].startsWith('</');
        result.push(tagBuffer); // Push the complete special tag as one unit
        tagBuffer = '';
        continue;
      }

      result.push(tagBuffer); // Push the complete tag
      tagBuffer = '';
    }
    // Inside the tag or special tag
    else if (insideTag || insideSpecialTag) {
      tagBuffer += char;
    }
    // Space outside of tags - push current word
    else if (char === ' ' && !insideTag && !insideSpecialTag) {
      if (currentWord) {
        result.push(currentWord);
        currentWord = '';
      }
      result.push(' ');
    }
    // Accumulate characters outside of tags
    else {
      currentWord += char;
    }
  }

  // Push any remaining text
  if (currentWord) {
    result.push(currentWord);
  }
  if (tagBuffer) {
    result.push(tagBuffer); // Push remaining tagBuffer
  }

  return result;
};
const formatDiffPart = (part, value, side) => {
  if (!isHtmlTag(value)) {
    if (part.removed && (side === 'left' || side === 'unified')) {
      return `<span class="deletion">${value}</span>`;
    } else if (part.removed) return '';
    else if (part.added && (side === 'right' || side === 'unified')) {
      return `<span class="addition">${value}</span>`;
    } else if (part.added) return '';
    return value;
  } else {
    if (side === 'unified' && part.added) return value;
    else if (side === 'unified' && part.removed) return '';
    if (part.removed && side === 'left') {
      return value;
    } else if (part.removed) return '';
    else if (part.added && side === 'right') {
      return value;
    } else if (part.added) return '';
    return value;
  }
};

/**
 * Diff field component.
 * @function DiffField
 * @param {*} one Field one
 * @param {*} two Field two
 * @param {Object} schema Field schema
 * @returns {string} Markup of the component.
 */

const DiffField = ({
  one,
  two,
  contentOne,
  contentTwo,
  view,
  schema,
  diffLib,
}) => {
  const language = useSelector((state) => state.intl.locale);
  const readable_date_format = {
    dateStyle: 'full',
    timeStyle: 'short',
  };
  const diffWords = (oneStr, twoStr) => {
    return diffLib.diffArrays(splitWords(oneStr), splitWords(twoStr));
  };

  let parts, oneArray, twoArray;
  if (schema.widget) {
    switch (schema.widget) {
      case 'richtext':
        parts = diffWords(one?.data, two?.data);
        break;
      case 'datetime':
        parts = diffWords(
          new Intl.DateTimeFormat(language, readable_date_format)
            .format(new Date(one))
            .replace('\u202F', ' '),
          new Intl.DateTimeFormat(language, readable_date_format)
            .format(new Date(two))
            .replace('\u202F', ' '),
        );
        break;
      case 'json': {
        const api = new Api();
        const history = createBrowserHistory();
        const store = configureStore(window.__data, history, api);
        parts = diffWords(
          ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
              <ConnectedRouter history={history}>
                <RenderBlocks content={contentOne} />
              </ConnectedRouter>
            </Provider>,
          ),
          ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
              <ConnectedRouter history={history}>
                <RenderBlocks content={contentTwo} />
              </ConnectedRouter>
            </Provider>,
          ),
        );
        break;
      }
      case 'slate': {
        const api = new Api();
        const history = createBrowserHistory();
        const store = configureStore(window.__data, history, api);
        parts = diffWords(
          ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
              <ConnectedRouter history={history}>
                {serializeNodes(one)}
              </ConnectedRouter>
            </Provider>,
          ),
          ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
              <ConnectedRouter history={history}>
                {serializeNodes(two)}
              </ConnectedRouter>
            </Provider>,
          ),
        );
        break;
      }
      case 'textarea':
      default:
        const Widget = config.widgets.views.widget[schema.widget];

        if (Widget) {
          const api = new Api();
          const history = createBrowserHistory();
          const store = configureStore(window.__data, history, api);
          parts = diffWords(
            ReactDOMServer.renderToStaticMarkup(
              <Provider store={store}>
                <ConnectedRouter history={history}>
                  <Widget value={one} />
                </ConnectedRouter>
              </Provider>,
            ),
            ReactDOMServer.renderToStaticMarkup(
              <Provider store={store}>
                <ConnectedRouter history={history}>
                  <Widget value={two} />
                </ConnectedRouter>
              </Provider>,
            ),
          );
        } else parts = diffWords(one, two);

        break;
    }
  } else if (schema.type === 'object') {
    parts = diffWords(one?.filename || one, two?.filename || two);
  } else if (schema.type === 'array') {
    oneArray = (one || []).map((i) => i?.title || i);
    twoArray = (two || []).map((j) => j?.title || j);
    parts = diffWords(oneArray, twoArray);
  } else {
    parts = diffWords(one?.title || one, two?.title || two);
  }

  return (
    <Grid data-testid="DiffField">
      <Grid.Row>
        <Grid.Column width={12}>{schema.title}</Grid.Column>
      </Grid.Row>

      {view === 'split' && (
        <Grid.Row>
          <Grid.Column width={6} verticalAlign="top">
            <div>
              <span
                dangerouslySetInnerHTML={{
                  __html: join(
                    map(parts, (part) => {
                      let combined = (part.value || []).reduce((acc, value) => {
                        return acc + formatDiffPart(part, value, 'left');
                      }, '');
                      return combined;
                    }),
                    '',
                  ),
                }}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={6} verticalAlign="top">
            <div>
              <span
                dangerouslySetInnerHTML={{
                  __html: join(
                    map(parts, (part) => {
                      let combined = (part.value || []).reduce((acc, value) => {
                        return acc + formatDiffPart(part, value, 'right');
                      }, '');
                      return combined;
                    }),
                    '',
                  ),
                }}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      )}
      {view === 'unified' && (
        <Grid.Row>
          <Grid.Column width={16} verticalAlign="top">
            <span
              dangerouslySetInnerHTML={{
                __html: join(
                  map(parts, (part) => {
                    let combined = (part.value || []).reduce((acc, value) => {
                      return acc + formatDiffPart(part, value, 'unified');
                    }, '');
                    return combined;
                  }),
                  '',
                ),
              }}
            />
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DiffField.propTypes = {
  one: PropTypes.any.isRequired,
  two: PropTypes.any.isRequired,
  contentOne: PropTypes.any,
  contentTwo: PropTypes.any,
  view: PropTypes.string.isRequired,
  schema: PropTypes.shape({
    widget: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default injectLazyLibs('diffLib')(DiffField);
