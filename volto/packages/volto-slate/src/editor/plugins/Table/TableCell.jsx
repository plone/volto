import React from 'react';
import cx from 'classnames';

export const TableCell = ({
  active,
  row,
  column,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const handleClick = React.useCallback(
    (ev) => {
      onClick({ row, column });
    },
    [column, onClick, row],
  );

  const handleMouseEnter = React.useCallback(
    (ev) => {
      onMouseEnter({ row, column });
    },
    [column, onMouseEnter, row],
  );

  const handleMouseLeave = React.useCallback(
    (ev) => {
      onMouseLeave({ row, column });
    },
    [column, onMouseLeave, row],
  );

  return (
    <td
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cx({ active })}
    >
      <button onClick={handleClick}></button>
    </td>
  );
};

export default TableCell;
