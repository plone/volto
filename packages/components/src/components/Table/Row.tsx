import React from 'react';
import {
  type RowProps,
  Row as RACRow,
  Cell,
  Collection,
  useTableOptions,
  Button,
} from 'react-aria-components';
import { Checkbox } from '../Checkbox/Checkbox';
import { DraggableIcon } from '../icons/DraggableIcon';

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <RACRow id={id} {...otherProps}>
      {allowsDragging && (
        <Cell className="react-aria-Cell drag-cell">
          <Button slot="drag">
            <DraggableIcon />
          </Button>
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
