/**
 * Slate Table block editor.
 * @module volto-slate/blocks/Table/Edit
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map, remove } from 'lodash';
import { Button, Table } from 'semantic-ui-react';
import cx from 'classnames';
import { defineMessages, injectIntl } from 'react-intl';

import Cell from './Cell';
import { Icon, SidebarPortal } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import TableSchema from './schema';

import rowBeforeSVG from '@plone/volto/icons/row-before.svg';
import rowAfterSVG from '@plone/volto/icons/row-after.svg';
import colBeforeSVG from '@plone/volto/icons/column-before.svg';
import colAfterSVG from '@plone/volto/icons/column-after.svg';
import rowDeleteSVG from '@plone/volto/icons/row-delete.svg';
import colDeleteSVG from '@plone/volto/icons/column-delete.svg';

/**
 * Returns a random string of 32 digits.
 */
const getId = () => Math.floor(Math.random() * Math.pow(2, 24)).toString(32);

/**
 * @returns {object} An empty Slate paragraph (a simple Slate block node with
 * type set to "p" and a `Text` child with an empty string).
 */
function getEmptyParagraph() {
  return [{ type: 'p', children: [{ text: '' }] }];
}

/**
 * @param {string} type The type of the newly created cell: either 'header' or
 * 'data', by default it is 'data'.
 * @returns {object} A new cell object containing three properties: `key`,
 * `type` and `value`.
 */
const emptyCell = (type = 'data') => ({
  key: getId(),
  type: type,
  value: getEmptyParagraph(),
});

/**
 * @param {Array[object]} cells Array of placeholders, each of them will be
 * replaced in the newly created row with an empty cell. (Practically, just the
 * length of the array matters.)
 * @returns {object} A new row object containing the keys `key` and `cells`.
 */
const emptyRow = (cells) => ({
  key: getId(),
  cells: map(cells, () => emptyCell()),
});

/**
 * The initial value for the displayed table's data. The IDs of the rows and
 * cells are computed here only once, so each new table has the same IDs
 * initially, but this does not have bad consequences since the key has
 * relevance only in the context in which it is used.
 */
const initialTable = {
  hideHeaders: false,
  fixed: true,
  compact: false,
  basic: false,
  celled: true,
  inverted: false,
  striped: false,
  rows: [
    {
      key: getId(),
      cells: [
        {
          key: getId(),
          type: 'header',
          value: getEmptyParagraph(),
        },
        {
          key: getId(),
          type: 'header',
          value: getEmptyParagraph(),
        },
      ],
    },
    {
      key: getId(),
      cells: [
        {
          key: getId(),
          type: 'data',
          value: getEmptyParagraph(),
        },
        {
          key: getId(),
          type: 'data',
          value: getEmptyParagraph(),
        },
      ],
    },
  ],
};

const messages = defineMessages({
  insertRowBefore: {
    id: 'Insert row before',
    defaultMessage: 'Insert row before',
  },
  insertRowAfter: {
    id: 'Insert row after',
    defaultMessage: 'Insert row after',
  },
  deleteRow: {
    id: 'Delete row',
    defaultMessage: 'Delete row',
  },
  insertColBefore: {
    id: 'Insert col before',
    defaultMessage: 'Insert col before',
  },
  insertColAfter: {
    id: 'Insert col after',
    defaultMessage: 'Insert col after',
  },
  deleteCol: {
    id: 'Delete col',
    defaultMessage: 'Delete col',
  },
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  bottom: {
    id: 'Bottom',
    defaultMessage: 'Bottom',
  },
  middle: {
    id: 'Middle',
    defaultMessage: 'Middle',
  },
  top: {
    id: 'Top',
    defaultMessage: 'Top',
  },
});

/**
 * Edit component for the Slate Table block type in Volto.
 * @function Edit
 */
const Edit = (props) => {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  const { data, selected, block, onChangeBlock } = props;

  const [selectedCell, setSelectedCell] = useState({ row: 0, cell: 0 });
  const [isClient, setIsClient] = useState(false);

  /**
   * Effect hook to handle componentDidMount logic
   * This runs once after the initial render
   */
  useEffect(() => {
    if (!data.table || isEmpty(data.table)) {
      onChangeBlock(block, {
        ...data,
        table: initialTable,
      });
    }
    setIsClient(true);
  }, []);

  /**
   * Effect hook to handle componentWillReceiveProps logic
   * This runs when data changes
   */
  useEffect(() => {
    if (!data.table || isEmpty(data.table)) {
      onChangeBlock(block, {
        ...data,
        table: initialTable,
      });
    }
  }, [data]);

  /**
   * On change
   * @method onChange
   * @param {string} id Id of modified property.
   * @param {any} value New value of modified property.
   * @returns {undefined}
   */
  const onChange = useCallback(
    (id, value) => {
      const table = data.table;
      onChangeBlock(block, {
        ...data,
        table: {
          ...table,
          [id]: value,
        },
      });
    },
    [data, onChangeBlock, block],
  );

  /**
   * Select cell handler
   * @method onSelectCell
   * @param {Number} row Row index.
   * @param {Number} cell Cell index.
   * @returns {undefined}
   */
  const onSelectCell = useCallback((row, cell) => {
    setSelectedCell({ row, cell });
  }, []);

  /**
   * Change cell handler
   * @param {Number} row Row index.
   * @param {Number} cell Cell index.
   * @param {Array} slateValue Value of the `SlateEditor` in the cell.
   * @returns {undefined}
   */
  const onChangeCell = useCallback(
    (row, cell, slateValue) => {
      const table = JSON.parse(JSON.stringify(data.table));
      table.rows[row].cells[cell] = {
        ...table.rows[row].cells[cell],
        value: JSON.parse(JSON.stringify(slateValue)),
      };
      onChangeBlock(block, {
        ...data,
        table,
      });
    },
    [data, onChangeBlock, block],
  );

  /**
   * Toggle cell type (from header to data or reverse)
   * @method toggleCellType
   * @returns {undefined}
   */
  const toggleCellType = useCallback(() => {
    const table = { ...data.table };
    let type = table.rows[selectedCell.row].cells[selectedCell.cell].type;
    table.rows[selectedCell.row].cells[selectedCell.cell].type =
      type === 'header' ? 'data' : 'header';

    onChangeBlock(block, {
      ...data,
      table,
    });
  }, [data, onChangeBlock, block, selectedCell]);

  /**
   * Insert row before handler. Keeps the selected cell as selected after the
   * operation is done.
   * @returns {undefined}
   */
  const onInsertRowBefore = useCallback(() => {
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: [
          ...table.rows.slice(0, selectedCell.row),
          emptyRow(table.rows[0].cells),
          ...table.rows.slice(selectedCell.row),
        ],
      },
    });
    setSelectedCell({
      row: selectedCell.row + 1,
      cell: selectedCell.cell,
    });
  }, [data, onChangeBlock, block, selectedCell]);

  /**
   * Insert row after handler
   * @returns {undefined}
   */
  const onInsertRowAfter = useCallback(() => {
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: [
          ...table.rows.slice(0, selectedCell.row + 1),
          emptyRow(table.rows[0].cells),
          ...table.rows.slice(selectedCell.row + 1),
        ],
      },
    });
  }, [data, onChangeBlock, block, selectedCell]);

  /**
   * Insert column before handler
   * @returns {undefined}
   */
  const onInsertColBefore = useCallback(() => {
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, selectedCell.cell),
            emptyCell(row.cells[selectedCell.cell].type),
            ...row.cells.slice(selectedCell.cell),
          ],
        })),
      },
    });
    setSelectedCell({
      row: selectedCell.row,
      cell: selectedCell.cell + 1,
    });
  }, [data, onChangeBlock, block, selectedCell]);

  /**
   * Insert column after handler
   * @returns {undefined}
   */
  const onInsertColAfter = useCallback(() => {
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, selectedCell.cell + 1),
            emptyCell(row.cells[selectedCell.cell].type),
            ...row.cells.slice(selectedCell.cell + 1),
          ],
        })),
      },
    });
  }, [data, onChangeBlock, block, selectedCell]);

  /**
   * Delete row handler
   * @returns {undefined}
   */
  const onDeleteRow = useCallback(() => {
    const table = data.table;
    const rows = JSON.parse(JSON.stringify(table.rows));
    remove(rows, (row, index) => index === selectedCell.row);
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows,
      },
    });
    setSelectedCell({ row: 0, cell: 0 });
  }, [data, onChangeBlock, block, selectedCell]);

  /**
   * Delete column handler
   * @returns {undefined}
   */
  const onDeleteCol = useCallback(() => {
    const table = data.table;
    const rows = map(table.rows, (row) => {
      const newRow = JSON.parse(JSON.stringify(row));
      remove(newRow.cells, (cell, index) => index === selectedCell.cell);
      return newRow;
    });
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows,
      },
    });
    setSelectedCell({ row: 0, cell: 0 });
  }, [data, onChangeBlock, block, selectedCell]);

  return (
    <>
      <div
        className={cx(
          'block selected table align',
          {
            center: !Boolean(data.align),
          },
          data.align,
        )}
      >
        <Table
          basic={data.table.basic ? 'very' : false}
          compact={data.table.compact ? 'very' : false}
          fixed={data.table.fixed}
          celled={data.table.celled}
          inverted={data.table.inverted}
          striped={data.table.striped}
        >
          {!data.table.hideHeaders && (
            <Table.Header>
              <Table.Row>
                {map(data.table.rows[0].cells, (item, index) => (
                  <Cell
                    key={item.key}
                    value={item.value}
                    row={0}
                    cell={index}
                    selected={
                      selectedCell.row === 0 && selectedCell.cell === index
                    }
                    onFocus={() => onSelectCell(0, index)}
                    onChange={(value) => onChangeCell(0, index, value)}
                    editable
                  />
                ))}
              </Table.Row>
            </Table.Header>
          )}
          <Table.Body>
            {map(data.table.rows.slice(1), (row, rowIndex) => (
              <Table.Row key={row.key}>
                {map(row.cells, (cell, cellIndex) => (
                  <Cell
                    key={cell.key}
                    value={cell.value}
                    row={rowIndex + 1}
                    cell={cellIndex}
                    selected={
                      selectedCell.row === rowIndex + 1 &&
                      selectedCell.cell === cellIndex
                    }
                    onFocus={() => onSelectCell(rowIndex + 1, cellIndex)}
                    onChange={(value) =>
                      onChangeCell(rowIndex + 1, cellIndex, value)
                    }
                    editable
                  />
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <SidebarPortal selected={selected}>
        <div className="sidebar-metadata-container">
          <BlockDataForm
            schema={TableSchema(props)}
            title={props.intl.formatMessage(messages.edit)}
            onChangeField={(id, value) => onChange(id, value)}
            formData={data.table}
          />
          <div className="buttons-wrapper">
            <Button.Group fluid>
              <Button
                icon
                basic
                onClick={onInsertRowBefore}
                aria-label={props.intl.formatMessage(messages.insertRowBefore)}
              >
                <Icon name={rowBeforeSVG} size="24px" />
              </Button>
              <Button
                icon
                basic
                onClick={onInsertRowAfter}
                aria-label={props.intl.formatMessage(messages.insertRowAfter)}
              >
                <Icon name={rowAfterSVG} size="24px" />
              </Button>
              <Button
                icon
                basic
                onClick={onDeleteRow}
                aria-label={props.intl.formatMessage(messages.deleteRow)}
              >
                <Icon name={rowDeleteSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group fluid>
              <Button
                icon
                basic
                onClick={onInsertColBefore}
                aria-label={props.intl.formatMessage(messages.insertColBefore)}
              >
                <Icon name={colBeforeSVG} size="24px" />
              </Button>
              <Button
                icon
                basic
                onClick={onInsertColAfter}
                aria-label={props.intl.formatMessage(messages.insertColAfter)}
              >
                <Icon name={colAfterSVG} size="24px" />
              </Button>
              <Button
                icon
                basic
                onClick={onDeleteCol}
                aria-label={props.intl.formatMessage(messages.deleteCol)}
              >
                <Icon name={colDeleteSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button
              fluid
              basic
              onClick={toggleCellType}
              aria-label={props.intl.formatMessage(
                selectedCell.type === 'header'
                  ? messages.data
                  : messages.header,
              )}
            >
              {selectedCell.type === 'header'
                ? props.intl.formatMessage(messages.data)
                : props.intl.formatMessage(messages.header)}
            </Button>
          </div>
        </div>
      </SidebarPortal>
    </>
  );
};

Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  detached: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onAddBlock: PropTypes.func.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onInsertBlock: PropTypes.func.isRequired,
  onMutateBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
};

export default injectIntl(Edit);
