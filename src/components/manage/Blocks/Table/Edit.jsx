/**
 * Edit text block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { map, remove } from 'lodash';
import { Button, Segment, Table, Form } from 'semantic-ui-react';
import { Portal } from 'react-portal';
import cx from 'classnames';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import Cell from '@plone/volto/components/manage/Blocks/Table/Cell';
import { Field, Icon } from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { useClient } from '@plone/volto/hooks';

import rowBeforeSVG from '@plone/volto/icons/row-before.svg';
import rowAfterSVG from '@plone/volto/icons/row-after.svg';
import colBeforeSVG from '@plone/volto/icons/column-before.svg';
import colAfterSVG from '@plone/volto/icons/column-after.svg';
import rowDeleteSVG from '@plone/volto/icons/row-delete.svg';
import colDeleteSVG from '@plone/volto/icons/column-delete.svg';

const getId = () => Math.floor(Math.random() * Math.pow(2, 24)).toString(32);

const valueToDraft = (value) => ({
  blocks: [
    {
      data: {},
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [],
      key: getId(),
      text: value,
      type: 'unstyled',
    },
  ],
  entityMap: {},
});

const emptyCell = (type) => ({
  key: getId(),
  type: type || 'data',
  value: valueToDraft(''),
});

const emptyRow = (cells) => ({
  key: getId(),
  cells: map(cells, () => emptyCell()),
});

const initialTable = () => ({
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
          value: valueToDraft(''),
        },
        {
          key: getId(),
          type: 'header',
          value: valueToDraft(''),
        },
      ],
    },
    {
      key: getId(),
      cells: [
        {
          key: getId(),
          type: 'data',
          value: valueToDraft(''),
        },
        {
          key: getId(),
          type: 'data',
          value: valueToDraft(''),
        },
      ],
    },
  ],
});

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
  fixed: {
    id: 'Fixed width table cells',
    defaultMessage: 'Fixed width columns',
  },
  compact: {
    id: 'Make the table compact',
    defaultMessage: 'Reduce cell padding',
  },
  basic: {
    id: 'Reduce complexity',
    defaultMessage: 'Minimalistic table design',
  },
  celled: {
    id: 'Divide each row into separate cells',
    defaultMessage: 'Add border to inner columns',
  },
  striped: {
    id: 'Stripe alternate rows with color',
    defaultMessage: 'Alternate row background color',
  },
  headerCell: {
    id: 'Header cell',
    defaultMessage: 'Header cell',
  },
});

const Edit = (props) => {
  const {
    data,
    block,
    onChangeBlock,
    draftJs,
    onAddBlock,
    onSelectBlock,
    index,
  } = props;
  const intl = useIntl();
  const isClient = useClient();
  const [selected, setSelected] = useState({
    row: 0,
    cell: 0,
  });

  const { convertToRaw } = draftJs;

  useEffect(() => {
    if (!data.table) {
      onChangeBlock(block, {
        ...data,
        table: initialTable(),
      });
    }
  }, [data, block, onChangeBlock]);

  useEffect(() => {
    if (!data.table) {
      onChangeBlock(block, {
        ...data,
        table: initialTable(),
      });
    }
  }, [data, block, onChangeBlock]);

  const onSelectCell = (row, cell) => {
    setSelected({
      row: row,
      cell: cell,
    });
  };

  const onChangeCell = (row, cell, editorState) => {
    const table = { ...data.table };
    table.rows[row].cells[cell].value = convertToRaw(
      editorState.getCurrentContent(),
    );
    onChangeBlock(block, {
      ...data,
      table,
    });
  };

  const toggleCellType = () => {
    const table = { ...data.table };
    let type = table.rows[selected.row].cells[selected.cell].type;
    table.rows[selected.row].cells[selected.cell].type =
      type === 'header' ? 'data' : 'header';
    onChangeBlock(block, {
      ...data,
      table,
    });
  };

  const onInsertRowBefore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: [
          ...table.rows.slice(0, selected.row),
          emptyRow(table.rows[0].cells),
          ...table.rows.slice(selected.row),
        ],
      },
    });
    setSelected({
      row: selected.row + 1,
      cell: selected.cell,
    });
  };

  const onInsertRowAfter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: [
          ...table.rows.slice(0, selected.row + 1),
          emptyRow(table.rows[0].cells),
          ...table.rows.slice(selected.row + 1),
        ],
      },
    });
  };

  const onInsertColBefore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row, index) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, selected.cell),
            emptyCell(table.rows[index].cells[selected.cell].type),
            ...row.cells.slice(selected.cell),
          ],
        })),
      },
    });
    setSelected({
      row: selected.row,
      cell: selected.cell + 1,
    });
  };

  const onInsertColAfter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row, index) => ({
          ...row,
          cells: [
            ...row.cells.slice(0, selected.cell + 1),
            emptyCell(table.rows[index].cells[selected.cell].type),
            ...row.cells.slice(selected.cell + 1),
          ],
        })),
      },
    });
  };

  const onDeleteCol = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const table = data.table;

    if (selected.cell === table.rows[0].cells.length - 1) {
      setSelected({
        row: selected.row,
        cell: selected.cell - 1,
      });
    }

    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: map(table.rows, (row) => ({
          ...row,
          cells: remove(row.cells, (cell, index) => index !== selected.cell),
        })),
      },
    });
  };

  const onDeleteRow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const table = data.table;

    if (selected.row === table.rows.length - 1) {
      setSelected({
        row: selected.row - 1,
        cell: selected.cell,
      });
    }

    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        rows: remove(table.rows, (row, index) => index !== selected.row),
      },
    });
  };

  const toggleBool = (value) => {
    const table = data.table;
    onChangeBlock(block, {
      ...data,
      table: {
        ...table,
        [value]: !table[value],
      },
    });
  };

  const toggleFixed = () => {
    toggleBool('fixed');
  };

  const toggleCompact = () => {
    toggleBool('compact');
  };

  const toggleBasic = () => {
    toggleBool('basic');
  };

  const toggleCelled = () => {
    toggleBool('celled');
  };

  const toggleStriped = () => {
    toggleBool('striped');
  };

  if (!isClient) {
    return <div />;
  }

  return (
    <div className={cx('block table', { selected: props.selected })}>
      {props.selected && (
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
              disabled={data.table && data.table.rows.length === 1}
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
              disabled={data.table && data.table.rows[0].cells.length === 1}
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
        >
          <Table.Body>
            {map(data.table.rows, (row, rowIndex) => (
              <Table.Row key={row.key}>
                {map(row.cells, (cell, cellIndex) => (
                  <Table.Cell
                    key={cell.key}
                    as={cell.type === 'header' ? 'th' : 'td'}
                    className={
                      rowIndex === selected.row &&
                      cellIndex === selected.cell &&
                      props.selected
                        ? 'selected'
                        : ''
                    }
                  >
                    <Cell
                      editable={props.editable}
                      value={cell.value}
                      row={rowIndex}
                      cell={cellIndex}
                      onSelectCell={onSelectCell}
                      selected={
                        rowIndex === selected.row && cellIndex === selected.cell
                      }
                      isTableBlockSelected={props.selected}
                      onAddBlock={onAddBlock}
                      onSelectBlock={onSelectBlock}
                      onChange={onChangeCell}
                      index={index}
                      disableNewBlocks={data?.disableNewBlocks}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {props.selected && isClient && (
        <Portal node={document.getElementById('sidebar-properties')}>
          <Form
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <Segment secondary attached>
              <FormattedMessage id="Table" defaultMessage="Table" />
            </Segment>
            <Segment attached>
              <Field
                id="fixed"
                title={intl.formatMessage(messages.fixed)}
                type="boolean"
                value={data.table && data.table.fixed}
                onChange={() => toggleFixed()}
              />
              <Field
                id="celled"
                title={intl.formatMessage(messages.celled)}
                type="boolean"
                value={data.table && data.table.celled}
                onChange={toggleCelled}
              />
              <Field
                id="striped"
                title={intl.formatMessage(messages.striped)}
                type="boolean"
                value={data.table && data.table.striped}
                onChange={toggleStriped}
              />
              <Field
                id="compact"
                title={intl.formatMessage(messages.compact)}
                type="boolean"
                value={data.table && data.table.compact}
                onChange={() => toggleCompact()}
              />
              <Field
                id="basic"
                title={intl.formatMessage(messages.basic)}
                type="boolean"
                value={data.table && data.table.basic}
                onChange={toggleBasic}
              />
            </Segment>
            <Segment secondary attached>
              <FormattedMessage id="Cell" defaultMessage="Cell" />
            </Segment>
            <Segment attached>
              <Field
                id="celltype"
                title={intl.formatMessage(messages.headerCell)}
                type="boolean"
                value={
                  data.table &&
                  data.table.rows[selected.row].cells[selected.cell].type ===
                    'header'
                }
                onChange={toggleCellType}
              />
            </Segment>
          </Form>
        </Portal>
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
  onInsertBlock: PropTypes.func.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onMutateBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
};
Edit.defaultProps = {
  detached: false,
};
export default compose(injectLazyLibs(['draftJs']))(Edit);
