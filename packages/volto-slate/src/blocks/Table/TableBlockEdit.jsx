/**
 * Slate Table block editor.
 * @module volto-slate/blocks/Table/Edit
 */

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import remove from 'lodash/remove';
import { Button, Table } from 'semantic-ui-react';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

import Cell from './Cell';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
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
 * @param {Object} props
 * @returns {JSX.Element}
 */
const Edit = (props) => {
  const {
    data,

    index,
    selected,
    block,
    onAddBlock,
    onChangeBlock,
    onSelectBlock,
    blocksConfig,
  } = props;

  const intl = useIntl();
  const prevSelectedRef = useRef(selected);

  const [selectedCell, setSelectedCell] = useState({
    row: 0,
    cell: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!data.table || isEmpty(data.table)) {
      onChangeBlock(block, {
        ...data,
        table: initialTable,
      });
    }
  }, [data.table, data, block, onChangeBlock]);

  useEffect(() => {
    if (prevSelectedRef.current && !selected) {
      setSelectedCell(null);
    }
    prevSelectedRef.current = selected;
  }, [selected]);

  const headers = useMemo(
    () => data.table?.rows?.[0]?.cells || [],
    [data.table],
  );

  const rows = useMemo(
    () => data.table?.rows?.filter((_, index) => index > 0) || [],
    [data.table],
  );

  const schema = useMemo(() => TableSchema(props), [props]);

  // eslint-disable-next-line no-unused-vars
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
    [data, block, onChangeBlock],
  );

  const onSelectCell = useCallback((row, cell) => {
    setSelectedCell({ row, cell });
  }, []);

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
    [data, block, onChangeBlock],
  );

  // eslint-disable-next-line no-unused-vars
  const toggleCellType = useCallback(() => {
    const table = { ...data.table };
    const type = table.rows[selectedCell.row].cells[selectedCell.cell].type;
    table.rows[selectedCell.row].cells[selectedCell.cell].type =
      type === 'header' ? 'data' : 'header';
    onChangeBlock(block, {
      ...data,
      table,
    });
  }, [data, block, onChangeBlock, selectedCell]);

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
  }, [data, block, onChangeBlock, selectedCell]);

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
  }, [data, block, onChangeBlock, selectedCell]);

  const onInsertColBefore = useCallback(() => {
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row, index) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, selectedCell.cell),
            emptyCell(table.rows[index].cells[selectedCell.cell].type),
            ...row.cells.slice(selectedCell.cell),
          ],
        })),
      },
    });
    setSelectedCell({
      row: selectedCell.row,
      cell: selectedCell.cell + 1,
    });
  }, [data, block, onChangeBlock, selectedCell]);

  const onInsertColAfter = useCallback(() => {
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row, index) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, selectedCell.cell + 1),
            emptyCell(table.rows[index].cells[selectedCell.cell].type),
            ...row.cells.slice(selectedCell.cell + 1),
          ],
        })),
      },
    });
  }, [data, block, onChangeBlock, selectedCell]);

  const onDeleteCol = useCallback(() => {
    const table = data.table;

    if (selectedCell.cell === table.rows[0].cells.length - 1) {
      setSelectedCell({
        row: selectedCell.row,
        cell: selectedCell.cell - 1,
      });
    }

    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row) => ({
          ...row,
          cells: remove(
            row.cells,
            (cell, index) => index !== selectedCell.cell,
          ),
        })),
      },
    });
  }, [data, block, onChangeBlock, selectedCell]);

  const onDeleteRow = useCallback(() => {
    const table = data.table;

    if (selectedCell.row === table.rows.length - 1) {
      setSelectedCell({
        row: selectedCell.row - 1,
        cell: selectedCell.cell,
      });
    }

    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: remove(table.rows, (row, index) => index !== selectedCell.row),
      },
    });
  }, [data, block, onChangeBlock, selectedCell]);

  return (
    <div className={cx('block table', { selected })}>
      {selected && (
        <div className="toolbar">
          <Button.Group>
            <Button
              icon
              basic
              onClick={onInsertRowBefore}
              title={intl.formatMessage(messages.insertRowBefore)}
              aria-label={intl.formatMessage(messages.insertRowBefore)}
            >
              <Icon name={rowBeforeSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              icon
              basic
              onClick={onInsertRowAfter}
              title={intl.formatMessage(messages.insertRowAfter)}
              aria-label={intl.formatMessage(messages.insertRowAfter)}
            >
              <Icon name={rowAfterSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              icon
              basic
              onClick={onDeleteRow}
              disabled={data.table?.rows?.length === 1}
              title={intl.formatMessage(messages.deleteRow)}
              aria-label={intl.formatMessage(messages.deleteRow)}
            >
              <Icon name={rowDeleteSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              icon
              basic
              onClick={onInsertColBefore}
              title={intl.formatMessage(messages.insertColBefore)}
              aria-label={intl.formatMessage(messages.insertColBefore)}
            >
              <Icon name={colBeforeSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              icon
              basic
              onClick={onInsertColAfter}
              title={intl.formatMessage(messages.insertColAfter)}
              aria-label={intl.formatMessage(messages.insertColAfter)}
            >
              <Icon name={colAfterSVG} size="24px" />
            </Button>
          </Button.Group>
          <Button.Group>
            <Button
              icon
              basic
              onClick={onDeleteCol}
              disabled={data.table?.rows?.[0].cells.length === 1}
              title={intl.formatMessage(messages.deleteCol)}
              aria-label={intl.formatMessage(messages.deleteCol)}
            >
              <Icon name={colDeleteSVG} size="24px" />
            </Button>
          </Button.Group>
        </div>
      )}
      {data.table && (
        <Table
          fixed={data.table.fixed}
          compact={data.table.compact}
          basic={data.table.basic ? 'very' : false}
          celled={data.table.celled}
          inverted={data.table.inverted}
          striped={data.table.striped}
          className="slate-table-block"
        >
          {!data.table.hideHeaders ? (
            <Table.Header>
              <Table.Row textAlign="left">
                {headers.map((cell, cellIndex) => (
                  <Table.HeaderCell
                    key={cell.key}
                    textAlign="left"
                    verticalAlign="middle"
                  >
                    <Cell
                      value={cell.value}
                      row={0}
                      cell={cellIndex}
                      onSelectCell={onSelectCell}
                      selected={
                        selected &&
                        selectedCell &&
                        0 === selectedCell.row &&
                        cellIndex === selectedCell.cell
                      }
                      selectedCell={selectedCell}
                      isTableBlockSelected={selected}
                      onAddBlock={onAddBlock}
                      onSelectBlock={onSelectBlock}
                      onChange={onChangeCell}
                      index={index}
                    />
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
          ) : (
            ''
          )}
          <Table.Body>
            {map(rows, (row, rowIndex) => (
              <Table.Row key={row.key}>
                {map(row.cells, (cell, cellIndex) => (
                  <Table.Cell
                    key={cell.key}
                    textAlign="left"
                    verticalAlign="middle"
                    className={
                      selected &&
                      selectedCell &&
                      rowIndex + 1 === selectedCell.row &&
                      cellIndex === selectedCell.cell &&
                      selected
                        ? 'selected'
                        : ''
                    }
                  >
                    <Cell
                      value={cell.value}
                      row={rowIndex + 1}
                      cell={cellIndex}
                      onSelectCell={onSelectCell}
                      selected={
                        selected &&
                        selectedCell &&
                        rowIndex + 1 === selectedCell.row &&
                        cellIndex === selectedCell.cell
                      }
                      selectedCell={selectedCell}
                      isTableBlockSelected={selected}
                      onAddBlock={onAddBlock}
                      onSelectBlock={onSelectBlock}
                      onChange={onChangeCell}
                      index={index}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {selected && selectedCell && isClient && (
        <SidebarPortal selected={selected}>
          <BlockDataForm
            schema={schema}
            title={schema.title}
            onChangeField={(id, value) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            onChangeBlock={onChangeBlock}
            formData={data}
            block={block}
            blocksConfig={blocksConfig}
          />
        </SidebarPortal>
      )}
    </div>
  );
};

Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  detached: PropTypes.bool,
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
  blocksConfig: PropTypes.object,
};

export default Edit;
