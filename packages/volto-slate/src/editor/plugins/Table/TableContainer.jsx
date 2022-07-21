import React from 'react';
import TableSizePicker from './TableSizePicker';

export const TableContainer = ({
  rowCount,
  columnCount,
  activeRow,
  activeColumn,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}) => {
  return (
    <div style={{ padding: '1rem' }}>
      <TableSizePicker
        activeRow={activeRow}
        activeColumn={activeColumn}
        rowCount={rowCount}
        columnCount={columnCount}
        onCellClick={onCellClick}
        onCellMouseEnter={({ row, column }) => {
          onCellMouseEnter({ row, column });
        }}
        onCellMouseLeave={onCellMouseLeave}
      />
      <p
        style={{
          textAlign: 'center',
        }}
      >
        {activeColumn || 1} &times; {activeRow || 1}
      </p>
    </div>
  );
};

export default TableContainer;
