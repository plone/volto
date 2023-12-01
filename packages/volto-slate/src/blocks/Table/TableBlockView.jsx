/**
 * Slate Table block's View component.
 * @module volto-slate/blocks/Table/View
 */

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { map } from 'lodash';
import {
  serializeNodes,
  serializeNodesToText,
} from '@plone/volto-slate/editor/render';
import { Node } from 'slate';

// TODO: loading LESS files with `volto-slate/...` paths does not work currently
import '../../editor/plugins/Table/less/public.less';

/**
 * Slate Table block's View class.
 * @class View
 * @extends Component
 * @param {object} data The table data to render as a table.
 */
const View = ({ data }) => {
  const [state, setState] = useState({
    column: null,
    direction: null,
  });

  const headers = useMemo(() => {
    return data.table.rows?.[0]?.cells;
  }, [data.table.rows]);

  const rows = useMemo(() => {
    const items = [];
    if (!data.table.rows) return [];
    data.table.rows.forEach((row, index) => {
      if (index > 0) {
        items[index] = [];
        row.cells.forEach((cell, cellIndex) => {
          items[index][cellIndex] = {
            ...cell,
            value:
              cell.value && Node.string({ children: cell.value }).length > 0
                ? serializeNodes(cell.value)
                : '\u00A0',
            valueText:
              cell.value && Node.string({ children: cell.value }).length > 0
                ? serializeNodesToText(cell.value)
                : '\u00A0',
          };
        });
      }
    });
    return items;
  }, [data.table.rows]);

  const sortedRows = useMemo(() => {
    if (state.column === null) return Object.keys(rows);
    return Object.keys(rows).sort((a, b) => {
      const a_text = rows[a][state.column].valueText;
      const b_text = rows[b][state.column].valueText;
      if (state.direction === 'ascending' ? a_text < b_text : a_text > b_text) {
        return -1;
      }
      if (state.direction === 'ascending' ? a_text > b_text : a_text < b_text) {
        return 1;
      }
      return 0;
    });
  }, [state, rows]);

  return (
    <>
      {data && data.table && (
        <Table
          fixed={data.table.fixed}
          compact={data.table.compact}
          basic={data.table.basic ? 'very' : false}
          celled={data.table.celled}
          inverted={data.table.inverted}
          striped={data.table.striped}
          sortable={data.table.sortable}
          className="slate-table-block"
        >
          {!data.table.hideHeaders ? (
            <Table.Header>
              <Table.Row>
                {headers.map((cell, index) => (
                  <Table.HeaderCell
                    key={cell.key}
                    textAlign="left"
                    verticalAlign="middle"
                    sorted={state.column === index ? state.direction : null}
                    onClick={() => {
                      if (!data.table.sortable) return;
                      setState({
                        column: index,
                        direction:
                          state.column !== index
                            ? 'ascending'
                            : state.direction === 'ascending'
                            ? 'descending'
                            : 'ascending',
                      });
                    }}
                  >
                    {cell.value &&
                    Node.string({ children: cell.value }).length > 0
                      ? serializeNodes(cell.value)
                      : '\u00A0'}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
          ) : (
            ''
          )}
          <Table.Body>
            {map(sortedRows, (row) => (
              <Table.Row key={row}>
                {map(rows[row], (cell) => (
                  <Table.Cell
                    key={cell.key}
                    textAlign="left"
                    verticalAlign="middle"
                  >
                    {cell.value}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
