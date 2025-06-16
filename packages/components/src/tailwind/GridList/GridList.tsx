import React from 'react';
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  Button,
  composeRenderProps,
  type GridListItemProps,
  type GridListProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Checkbox } from '../Checkbox/Checkbox';
import { composeTailwindRenderProps, focusRing } from '../utils';

export function GridList<T extends object>({
  children,
  ...props
}: GridListProps<T>) {
  return (
    <AriaGridList
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'relative overflow-auto rounded-lg border border-gray-200 dark:border-zinc-600',
      )}
    >
      {children}
    </AriaGridList>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: 'relative -mb-px flex cursor-default gap-3 border-y border-transparent px-3 py-2 text-sm text-gray-900 -outline-offset-2 select-none first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 dark:border-y-zinc-700 dark:text-zinc-200',
  variants: {
    isSelected: {
      false: 'hover:bg-gray-100 dark:hover:bg-zinc-700/60',
      true: 'z-20 border-y-blue-200 bg-blue-100 hover:bg-blue-200 dark:border-y-blue-900 dark:bg-blue-700/30 dark:hover:bg-blue-700/40',
    },
    isDisabled: {
      true: 'z-10 text-slate-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
  },
});

export function GridListItem({ children, ...props }: GridListItemProps) {
  const textValue = typeof children === 'string' ? children : undefined;
  return (
    <AriaGridListItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        itemStyles({ ...renderProps, className }),
      )}
    >
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
    </AriaGridListItem>
  );
}
