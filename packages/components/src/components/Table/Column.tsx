import { type ColumnProps, Column as RACColumn } from 'react-aria-components';
import './Column.scss';

export default function Column(props: ColumnProps) {
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
