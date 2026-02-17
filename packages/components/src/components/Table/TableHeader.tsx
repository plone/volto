import React from 'react';
import {
  type TableHeaderProps,
  TableHeader as RACTableHeader,
  useTableOptions,
  Collection,
} from 'react-aria-components';
import { Checkbox } from '../Checkbox/Checkbox';
import { Column } from './Column';

interface Props<T extends object> extends TableHeaderProps<T> {
  dragColumnHeader?: React.ReactNode;
}

export function TableHeader<T extends object>({
  columns,
  children,
  dragColumnHeader,
}: Props<T>) {
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <RACTableHeader>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && (
        <Column className="react-aria-Column drag-column-header">
          {dragColumnHeader}
        </Column>
      )}
      {selectionBehavior === 'toggle' && (
        <Column>
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </RACTableHeader>
  );
}
