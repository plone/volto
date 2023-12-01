import React from 'react';
import TableCell from './TableCell';

export const TableSizePicker = ({
  rowCount,
  columnCount,
  activeRow,
  activeColumn,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}) => {
  const handleClick = React.useCallback(
    (...rest) => {
      onCellClick(...rest);
    },
    [onCellClick],
  );

  const handleMouseEnter = React.useCallback(
    (...rest) => {
      onCellMouseEnter(...rest);
    },
    [onCellMouseEnter],
  );

  const handleMouseLeave = React.useCallback(
    (...rest) => {
      onCellMouseLeave(...rest);
    },
    [onCellMouseLeave],
  );

  const createRow = React.useCallback(
    (rowIndex) => {
      const arr = [];
      for (let i = 0; i < columnCount; ++i) {
        const columnIndex = i + 1;

        arr.push(
          <TableCell
            key={columnIndex}
            row={rowIndex + 1}
            column={columnIndex}
            active={rowIndex + 1 <= activeRow && i + 1 <= activeColumn}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></TableCell>,
        );
      }
      return <tr key={rowIndex}>{arr}</tr>;
    },
    [
      activeColumn,
      activeRow,
      columnCount,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
    ],
  );

  const rows = [];
  for (let i = 0; i < rowCount; ++i) {
    rows.push(createRow(i));
  }

  const zoomFactor = 1;

  return (
    <table
      style={{
        width: `${columnCount * zoomFactor}rem`,
        height: `${rowCount * zoomFactor}rem`,
      }}
    >
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TableSizePicker;
