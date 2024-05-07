import React from 'react';
import {
  Button,
  Cell,
  Collection,
  Column as RACColumn,
  ColumnProps,
  Row as RACRow,
  RowProps,
  Table as RACTable,
  TableHeader as RACTableHeader,
  TableHeaderProps,
  TableProps,
  useTableOptions,
} from 'react-aria-components';

import { Checkbox } from '../Checkbox/Checkbox';

export function Table(props: TableProps) {
  return <RACTable {...props} />;
}

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

export function TableHeader<T extends object>({
  columns,
  children,
}: TableHeaderProps<T>) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

  return (
    <RACTableHeader>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <RACColumn />}
      {selectionBehavior === 'toggle' && (
        <RACColumn>
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </RACColumn>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACTableHeader>
  );
}

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  let { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <RACRow id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACRow>
  );
}
