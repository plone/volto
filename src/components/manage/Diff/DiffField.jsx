/**
 * Diff field component.
 * @module components/manage/Diff/DiffField
 */

import React from 'react';
// import { diffWords as dWords } from 'diff';
import { join, map } from 'lodash';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-intl-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';

import { Api } from '@plone/volto/helpers';
import configureStore from '@plone/volto/store';
import { DefaultView } from '@plone/volto/components/';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

/**
 * Enhanced diff words utility
 * @function diffWords
 * @param oneStr Field one
 * @param twoStr Field two
 */

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
    return diffLib.diffWords(String(oneStr), String(twoStr));
  };

  let parts, oneArray, twoArray;
  if (schema.widget) {
    switch (schema.widget) {
      case 'richtext':
        parts = diffWords(one?.data, two?.data);
        break;
      case 'datetime':
        parts = diffWords(
          new Intl.DateTimeFormat(language, readable_date_format).format(
            new Date(one),
          ),
          new Intl.DateTimeFormat(language, readable_date_format).format(
            new Date(two),
          ),
        );
        break;
      case 'json':
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
      case 'textarea':
      default:
        parts = diffWords(one, two);
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
                  map(
                    parts,
                    (part) =>
                      (part.removed &&
                        `<span class="deletion">${part.value}</span>`) ||
                      (!part.added && `<span>${part.value}</span>`) ||
                      '',
                  ),
                  '',
                ),
              }}
            />
          </Grid.Column>
          <Grid.Column width={6} verticalAlign="top">
            <span
              dangerouslySetInnerHTML={{
                __html: join(
                  map(
                    parts,
                    (part) =>
                      (part.added &&
                        `<span class="addition">${part.value}</span>`) ||
                      (!part.removed && `<span>${part.value}</span>`) ||
                      '',
                  ),
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
                  map(
                    parts,
                    (part) =>
                      (part.removed &&
                        `<span class="deletion">${part.value}</span>`) ||
                      (part.added &&
                        `<span class="addition">${part.value}</span>`) ||
                      (!part.added && `<span>${part.value}</span>`),
                  ),
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
