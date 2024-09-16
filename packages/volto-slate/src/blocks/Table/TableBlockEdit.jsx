/**
 * Slate Table block editor.
 * @module volto-slate/blocks/Table/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map, remove } from 'lodash-es';
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
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    detached: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      rows: {},
      selected: {
        row: 0,
        cell: 0,
      },
      isClient: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSelectCell = this.onSelectCell.bind(this);
    this.onInsertRowBefore = this.onInsertRowBefore.bind(this);
    this.onInsertRowAfter = this.onInsertRowAfter.bind(this);
    this.onInsertColBefore = this.onInsertColBefore.bind(this);
    this.onInsertColAfter = this.onInsertColAfter.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onDeleteCol = this.onDeleteCol.bind(this);
    this.onChangeCell = this.onChangeCell.bind(this);
    this.toggleCellType = this.toggleCellType.bind(this);
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (!this.props.data.table || isEmpty(this.props.data.table)) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        table: initialTable,
      });
    }
    this.setState({ isClient: true });
  }

  /**
   * Component will receive props lifecycle method
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.data.table || isEmpty(nextProps.data.table)) {
      this.props.onChangeBlock(nextProps.block, {
        ...nextProps.data,
        table: initialTable,
      });
    }
  }

  /**
   * On change
   * @method onChange
   * @param {string} id Id of modified property.
   * @param {any} value New value of modified property.
   * @returns {undefined}
   */
  onChange(id, value) {
    const table = this.props.data.table;
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table: {
        ...table,
        [id]: value,
      },
    });
  }

  /**
   * Select cell handler
   * @method onSelectCell
   * @param {Number} row Row index.
   * @param {Number} cell Cell index.
   * @returns {undefined}
   */
  onSelectCell(row, cell) {
    this.setState({ selected: { row, cell } });
  }

  /**
   * Change cell handler
   * @param {Number} row Row index.
   * @param {Number} cell Cell index.
   * @param {Array} slateValue Value of the `SlateEditor` in the cell.
   * @returns {undefined}
   */
  onChangeCell(row, cell, slateValue) {
    const table = JSON.parse(JSON.stringify(this.props.data.table));
    table.rows[row].cells[cell] = {
      ...table.rows[row].cells[cell],
      value: JSON.parse(JSON.stringify(slateValue)),
    };
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table,
    });
  }

  /**
   * Toggle cell type (from header to data or reverse)
   * @method toggleCellType
   * @returns {undefined}
   */
  toggleCellType() {
    const table = { ...this.props.data.table };
    let type =
      table.rows[this.state.selected.row].cells[this.state.selected.cell].type;
    table.rows[this.state.selected.row].cells[this.state.selected.cell].type =
      type === 'header' ? 'data' : 'header';
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table,
    });
  }

  /**
   * Insert row before handler. Keeps the selected cell as selected after the
   * operation is done.
   * @returns {undefined}
   */
  onInsertRowBefore() {
    const table = this.props.data.table;
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table: {
        ...table,
        rows: [
          ...table.rows.slice(0, this.state.selected.row),
          emptyRow(table.rows[0].cells),
          ...table.rows.slice(this.state.selected.row),
        ],
      },
    });
    this.setState({
      selected: {
        row: this.state.selected.row + 1,
        cell: this.state.selected.cell,
      },
    });
  }

  /**
   * Insert row after handler
   * @returns {undefined}
   */
  onInsertRowAfter() {
    const table = this.props.data.table;
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table: {
        ...table,
        rows: [
          ...table.rows.slice(0, this.state.selected.row + 1),
          emptyRow(table.rows[0].cells),
          ...table.rows.slice(this.state.selected.row + 1),
        ],
      },
    });
  }

  /**
   * Insert column before handler. Keeps the selected cell as selected after the
   * operation is done.
   * @returns {undefined}
   */
  onInsertColBefore() {
    const table = this.props.data.table;
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table: {
        ...table,
        rows: map(table.rows, (row, index) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, this.state.selected.cell),
            emptyCell(table.rows[index].cells[this.state.selected.cell].type),
            ...row.cells.slice(this.state.selected.cell),
          ],
        })),
      },
    });
    this.setState({
      selected: {
        row: this.state.selected.row,
        cell: this.state.selected.cell + 1,
      },
    });
  }

  /**
   * Insert column after handler
   * @returns {undefined}
   */
  onInsertColAfter() {
    const table = this.props.data.table;
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table: {
        ...table,
        rows: map(table.rows, (row, index) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, this.state.selected.cell + 1),
            emptyCell(table.rows[index].cells[this.state.selected.cell].type),
            ...row.cells.slice(this.state.selected.cell + 1),
          ],
        })),
      },
    });
  }

  /**
   * Delete column handler. Changes the selected cell if the last table column
   * is selected.
   * @returns {undefined}
   */
  onDeleteCol() {
    const table = this.props.data.table;

    if (this.state.selected.cell === table.rows[0].cells.length - 1) {
      this.setState({
        selected: {
          row: this.state.selected.row,
          cell: this.state.selected.cell - 1,
        },
      });
    }

    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table: {
        ...table,
        rows: map(table.rows, (row) => ({
          ...row,
          cells: remove(
            row.cells,
            (cell, index) => index !== this.state.selected.cell,
          ),
        })),
      },
    });
  }

  /**
   * Delete row handler. Changes the selected cell if the last table row is
   * selected.
   * @method onDeleteRow
   * @returns {undefined}
   */
  onDeleteRow() {
    const table = this.props.data.table;

    if (this.state.selected.row === table.rows.length - 1) {
      this.setState({
        selected: {
          row: this.state.selected.row - 1,
          cell: this.state.selected.cell,
        },
      });
    }

    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      table: {
        ...table,
        rows: remove(
          table.rows,
          (row, index) => index !== this.state.selected.row,
        ),
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected && !this.props.selected) {
      this.setState({ selected: null });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const headers = this.props.data.table?.rows?.[0]?.cells || [];
    const rows =
      this.props.data.table?.rows?.filter((_, index) => index > 0) || [];
    const schema = TableSchema(this.props);

    return (
      // TODO: use slate-table instead of table, but first copy the CSS styles
      // to the new name
      <div className={cx('block table', { selected: this.props.selected })}>
        {this.props.selected && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onInsertRowBefore}
                title={this.props.intl.formatMessage(messages.insertRowBefore)}
                aria-label={this.props.intl.formatMessage(
                  messages.insertRowBefore,
                )}
              >
                <Icon name={rowBeforeSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onInsertRowAfter}
                title={this.props.intl.formatMessage(messages.insertRowAfter)}
                aria-label={this.props.intl.formatMessage(
                  messages.insertRowAfter,
                )}
              >
                <Icon name={rowAfterSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onDeleteRow}
                disabled={this.props.data.table?.rows?.length === 1}
                title={this.props.intl.formatMessage(messages.deleteRow)}
                aria-label={this.props.intl.formatMessage(messages.deleteRow)}
              >
                <Icon name={rowDeleteSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onInsertColBefore}
                title={this.props.intl.formatMessage(messages.insertColBefore)}
                aria-label={this.props.intl.formatMessage(
                  messages.insertColBefore,
                )}
              >
                <Icon name={colBeforeSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onInsertColAfter}
                title={this.props.intl.formatMessage(messages.insertColAfter)}
                aria-label={this.props.intl.formatMessage(
                  messages.insertColAfter,
                )}
              >
                <Icon name={colAfterSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.onDeleteCol}
                disabled={this.props.data.table?.rows?.[0].cells.length === 1}
                title={this.props.intl.formatMessage(messages.deleteCol)}
                aria-label={this.props.intl.formatMessage(messages.deleteCol)}
              >
                <Icon name={colDeleteSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
        {this.props.data.table && (
          <Table
            fixed={this.props.data.table.fixed}
            compact={this.props.data.table.compact}
            basic={this.props.data.table.basic ? 'very' : false}
            celled={this.props.data.table.celled}
            inverted={this.props.data.table.inverted}
            striped={this.props.data.table.striped}
            className="slate-table-block"
          >
            {!this.props.data.table.hideHeaders ? (
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
                        onSelectCell={this.onSelectCell}
                        selected={
                          this.props.selected &&
                          this.state.selected &&
                          0 === this.state.selected.row &&
                          cellIndex === this.state.selected.cell
                        }
                        selectedCell={this.state.selected}
                        isTableBlockSelected={this.props.selected}
                        onAddBlock={this.props.onAddBlock}
                        onSelectBlock={this.props.onSelectBlock}
                        onChange={this.onChangeCell}
                        index={this.props.index}
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
                        this.props.selected &&
                        this.state.selected &&
                        rowIndex + 1 === this.state.selected.row &&
                        cellIndex === this.state.selected.cell &&
                        this.props.selected
                          ? 'selected'
                          : ''
                      }
                    >
                      <Cell
                        value={cell.value}
                        row={rowIndex + 1}
                        cell={cellIndex}
                        onSelectCell={this.onSelectCell}
                        selected={
                          this.props.selected &&
                          this.state.selected &&
                          rowIndex + 1 === this.state.selected.row &&
                          cellIndex === this.state.selected.cell
                        }
                        selectedCell={this.state.selected}
                        isTableBlockSelected={this.props.selected}
                        onAddBlock={this.props.onAddBlock}
                        onSelectBlock={this.props.onSelectBlock}
                        onChange={this.onChangeCell}
                        index={this.props.index}
                      />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        {this.props.selected && this.state.selected && this.state.isClient && (
          <SidebarPortal selected={this.props.selected}>
            <BlockDataForm
              schema={schema}
              title={schema.title}
              onChangeField={(id, value) => {
                this.props.onChangeBlock(this.props.block, {
                  ...this.props.data,
                  [id]: value,
                });
              }}
              onChangeBlock={this.props.onChangeBlock}
              formData={this.props.data}
              block={this.props.block}
              blocksConfig={this.props.blocksConfig}
            />
          </SidebarPortal>
        )}
      </div>
    );
  }
}

export default injectIntl(Edit);
