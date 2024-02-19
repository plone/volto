import React from 'react';
import { type ColumnProps, Column as RACColumn } from 'react-aria-components';

export function Column(props: ColumnProps) {
  return (
    <RACColumn {...props}>
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}
          {allowsSorting && (
            <span aria-hidden="true" className="sort-indicator">
              {sortDirection === 'ascending' ? '▲' : '▼'}
            </span>
          )}
        </>
      )}
    </RACColumn>
  );
}
