/**
 * Diff field component.
 * @module components/manage/Diff/DiffField
 */

import React from 'react';
import { diffWords as dWords } from 'diff';
import { join, map } from 'lodash';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-intl-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import { Api } from '@plone/volto/helpers';
import configureStore from '@plone/volto/store';
import { DefaultView } from '@plone/volto/components/';

/**
 * Enhanced diff words utility
 * @function diffWords
 * @param oneStr Field one
 * @param twoStr Field two
 */
const diffWords = (oneStr, twoStr) => {
  return dWords(String(oneStr), String(twoStr));
};

/**
 * Diff field component.
 * @function DiffField
 * @param {*} one Field one
 * @param {*} two Field two
 * @param {Object} schema Field schema
 * @returns {string} Markup of the component.
 */
const DiffField = ({ one, two, contentOne, contentTwo, view, schema }) => {
  let parts, oneArray, twoArray;
  if (schema.widget) {
    switch (schema.widget) {
      case 'richtext':
        parts = diffWords(one?.data, two?.data);
        break;
      case 'datetime':
        parts = diffWords(
          moment(one).format('LLLL'),
          moment(two).format('LLLL'),
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
    <Table compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan={2}>{schema.title}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {view === 'split' && (
          <Table.Row>
            <Table.Cell width={8} verticalAlign="top">
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
            </Table.Cell>
            <Table.Cell width={8} verticalAlign="top">
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
            </Table.Cell>
          </Table.Row>
        )}
        {view === 'unified' && (
          <Table.Row>
            <Table.Cell width={16} verticalAlign="top">
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
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
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

export default DiffField;
