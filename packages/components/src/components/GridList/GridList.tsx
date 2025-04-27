import React from 'react';
import {
  Button,
  GridList as RACGridList,
  GridListItem as RACGridListItem,
  type GridListItemProps,
  type GridListProps,
} from 'react-aria-components';

import { Checkbox } from '../Checkbox/Checkbox';

export function GridList<T extends object>({
  children,
  ...props
}: GridListProps<T>) {
  return <RACGridList {...props}>{children}</RACGridList>;
}

export function GridListItem({ children, ...props }: GridListItemProps) {
  let textValue = typeof children === 'string' ? children : undefined;
  return (
    <RACGridListItem textValue={textValue} {...props}>
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {/* Add elements for drag and drop and selection. */}
          {allowsDragging && <Button slot="drag">≡</Button>}
          {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </RACGridListItem>
  );
}
