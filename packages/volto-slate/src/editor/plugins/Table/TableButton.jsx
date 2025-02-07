import React from 'react';
import { useSlate } from 'slate-react';
import { Dropdown } from 'semantic-ui-react';
import ToolbarButton from '@plone/volto-slate/editor/ui/ToolbarButton';

import tableSVG from '@plone/volto/icons/table.svg';
import TableContainer from './TableContainer';
import './less/table.less';
import { Editor, Transforms } from 'slate';

const TableButton = ({ ...props }) => {
  const editor = useSlate();

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const [activeRow, setActiveRow] = React.useState(1);
  const [activeColumn, setActiveColumn] = React.useState(1);

  const defaultRowCount = 5;
  const defaultColumnCount = 5;

  const [rowCount, setRowCount] = React.useState(defaultRowCount);
  const [columnCount, setColumnCount] = React.useState(defaultColumnCount);

  const resetState = React.useCallback(() => {
    setRowCount(defaultRowCount);
    setColumnCount(defaultColumnCount);
    setActiveRow(1);
    setActiveColumn(1);
  }, []);

  const createEmptyCell = React.useCallback((formatAsColumnHeaders = false) => {
    return {
      type: formatAsColumnHeaders ? 'th' : 'td',
      children: [{ type: 'p', children: [{ text: '' }] }],
    };
  }, []);

  const createEmptyRow = React.useCallback(
    (cellCount, formatAsColumnHeaders = false) => {
      // should contain at least one <td> or it is not valid that children is empty
      const row = { type: 'tr', children: [] };

      for (let i = 0; i < cellCount; ++i) {
        row.children.push(createEmptyCell(formatAsColumnHeaders));
      }

      return row;
    },
    [createEmptyCell],
  );

  /**
   * @param {number} row Number of rows for the new empty table.
   * @param {number} column Number of columns for the new empty table.
   */
  const insertEmptyTable = React.useCallback(
    ({ row, column }) => {
      const rows = [createEmptyRow(column, true)];
      for (let i = 0; i < row - 1; ++i) {
        rows.push(createEmptyRow(column));
      }

      const table = {
        type: 'table',
        children: [
          {
            type: 'tbody',
            children: rows,
          },
        ],
      };

      Transforms.insertNodes(editor, [table], {
        at: Editor.end(editor, []),
      });
    },
    [createEmptyRow, editor],
  );

  return (
    <>
      <Dropdown
        open={dropdownOpen}
        onClose={() => {
          resetState();
          setDropdownOpen(false);
        }}
        trigger={
          <ToolbarButton
            {...props}
            className="slate-table-dropdown-button"
            onClick={() => {
              if (dropdownOpen) {
                resetState();
              }

              setDropdownOpen(!dropdownOpen);
            }}
            icon={tableSVG}
          ></ToolbarButton>
        }
      >
        <Dropdown.Menu className="slate-table-dropdown-menu">
          <TableContainer
            rowCount={rowCount}
            columnCount={columnCount}
            activeColumn={activeColumn}
            activeRow={activeRow}
            onCellMouseEnter={({ row, column }) => {
              if (row > rowCount - 1) {
                setRowCount(row + 1);
              } else if (row < rowCount - 1) {
                setRowCount(defaultRowCount);
              }

              if (column > columnCount - 1) {
                setColumnCount(column + 1);
              } else if (column < columnCount - 1) {
                setColumnCount(defaultColumnCount);
              }

              if (row !== activeRow) {
                setActiveRow(row);
              }
              if (column !== activeColumn) {
                setActiveColumn(column);
              }
            }}
            onCellMouseLeave={({ row, column }) => {}}
            // `row` and `column` below are 1-based indices
            onCellClick={({ row, column }) => {
              insertEmptyTable({ row, column });
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default TableButton;
