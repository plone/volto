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
import { DefaultView } from '@plone/volto/components/';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

/**
 * Helper function to handle repetitive value checks and formatting.
 */
const formatDiffPart = (part, value) => {
  if (
    !value.includes('<') &&
    !value.includes('>') &&
    !value.includes('</') &&
    !value.includes('"') &&
    !value.includes('src') &&
    !value.includes('href') &&
    !value.includes('=')
  ) {
    if (part.removed) {
      return `<span class="deletion">${value}</span>`;
    }
    if (part.added) {
      return `<span class="addition">${value}</span>`;
    }
  }
  return value;
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

  const splitWords = (str) => {
    if (!str) return [];
    const splitedArray = [];
    let elementCurent = '';
    let insideTag = false;
    for (let i = 0; i < str.length; i++)
      if (str[i] === '<') {
        if (elementCurent) splitedArray.push(elementCurent);
        elementCurent = '<';
        insideTag = true;
      } else if (str[i] === '>') {
        elementCurent += '>';
        splitedArray.push(elementCurent);
        elementCurent = '';
        insideTag = false;
      } else if (str[i] === ' ' && insideTag === false) {
        elementCurent += ' ';
        splitedArray.push(elementCurent);
        elementCurent = '';
      } else elementCurent += str[i];
    if (elementCurent) splitedArray.push(elementCurent);
    return splitedArray;
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
                <DefaultView content={contentOne} />
              </ConnectedRouter>
            </Provider>,
          ),
          ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
              <ConnectedRouter history={history}>
                <DefaultView content={contentTwo} />
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
            <span
              dangerouslySetInnerHTML={{
                __html: join(
                  map(parts, (part) => {
                    let combined = (part.value || []).reduce((acc, value) => {
                      return acc + formatDiffPart(part, value);
                    }, '');
                    return combined;
                  }),
                  '',
                ),
              }}
            />
          </Grid.Column>
          <Grid.Column width={6} verticalAlign="top">
            <span
              dangerouslySetInnerHTML={{
                __html: join(
                  map(parts, (part) => {
                    let combined = (part.value || []).reduce((acc, value) => {
                      return acc + formatDiffPart(part, value);
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
      {view === 'unified' && (
        <Grid.Row>
          <Grid.Column width={16} verticalAlign="top">
            <span
              dangerouslySetInnerHTML={{
                __html: join(
                  map(parts, (part) => {
                    let combined = (part.value || []).reduce((acc, value) => {
                      return acc + formatDiffPart(part, value);
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
