/**
 * Diff field component.
 * @module components/manage/Diff/DiffField
 */

import React from 'react';
import { diffWords } from 'diff';
import { join, map } from 'lodash';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import moment from 'moment';

/**
 * Diff field component.
 * @function DiffField
 * @param {*} one Field one
 * @param {*} two Field two
 * @param {Object} schema Field schema
 * @returns {string} Markup of the component.
 */
const DiffField = ({ one, two, view, schema }) => {
  let parts;
  if (schema.widget) {
    switch (schema.widget) {
      case 'richtext':
        parts = diffWords(one.data, two.data);
        break;
      case 'datetime':
        parts = diffWords(
          moment(one).format('LLLL'),
          moment(two).format('LLLL'),
        );
        break;
      case 'textarea':
      default:
        parts = diffWords(one, two);
        break;
    }
  } else if (schema.type === 'boolean') {
    parts = diffWords(one ? 'Yes' : 'No', two ? 'Yes' : 'No');
  } else if (schema.type === 'array') {
    parts = diffWords(join(one, ', '), join(two, ', '));
  } else {
    parts = diffWords(one, two);
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
                      part =>
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
                      part =>
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
                      part =>
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
  view: PropTypes.string.isRequired,
  schema: PropTypes.shape({
    widget: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default DiffField;
