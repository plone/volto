import React from 'react';
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  TableBody as AriaTableBody,
  Button,
  type CellProps,
  Collection,
  type ColumnProps,
  ColumnResizer,
  ResizableTableContainer,
  type RowProps,
  type TableHeaderProps as AriaTableHeaderProps,
  type TableProps as AriaTableProps,
  useTableOptions,
  type TableBodyProps,
} from 'react-aria-components/Table';
import { Group } from 'react-aria-components/Group';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { Checkbox } from '../Checkbox/Checkbox.quanta';
import { ArrowupIcon } from '../icons/ArrowupIcon';
import { ChevronrightIcon } from '../icons/ChevronrightIcon';
import { DraggableIcon } from '../icons/DraggableIcon';
import { composeTailwindRenderProps, focusRing } from '../utils';

interface TableProps extends Omit<AriaTableProps, 'className'> {
  className?: string;
}

export function Table(props: TableProps) {
  return (
    <ResizableTableContainer
      onScroll={props.onScroll}
      className={twMerge(
        `
          relative box-border max-h-80 w-full scroll-pt-[2.281rem] overflow-auto rounded-lg border
          border-neutral-300 bg-white font-sans
          dark:border-neutral-700 dark:bg-neutral-900
        `,
        props.className,
      )}
    >
      <AriaTable
        {...props}
        className={`
          box-border border-separate border-spacing-0 overflow-hidden
          has-[>[data-empty]]:h-full
        `}
      />
    </ResizableTableContainer>
  );
}

const columnStyles = tv({
  extend: focusRing,
  base: 'box-border flex h-5 flex-1 items-center gap-1 overflow-hidden px-2',
});

const resizerStyles = tv({
  extend: focusRing,
  base: `
    box-content h-5 w-px translate-x-2 cursor-col-resize rounded-xs bg-neutral-400 bg-clip-content
    px-2 py-1 -outline-offset-2
    dark:bg-neutral-500
    forced-colors:bg-[ButtonBorder]
    resizing:w-0.5 resizing:bg-quanta-sapphire resizing:pl-1.75
    forced-colors:resizing:bg-[Highlight]
  `,
});

export function Column(props: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        `
          box-border h-1 cursor-default text-start text-sm font-semibold text-neutral-700
          focus-within:z-20
          dark:text-neutral-300
          [&:hover]:z-20
        `,
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { allowsSorting, sortDirection }) => (
          <div className="flex items-center">
            <Group role="presentation" tabIndex={-1} className={columnStyles}>
              <span className="truncate">{children}</span>
              {allowsSorting && (
                <span
                  className={`
                    flex h-4 w-4 items-center justify-center transition
                    ${sortDirection === 'descending' ? 'rotate-180' : ''}
                  `}
                >
                  {sortDirection && (
                    <ArrowupIcon
                      aria-hidden
                      className={`
                        h-4 w-4 text-neutral-500
                        dark:text-neutral-400
                        forced-colors:text-[ButtonText]
                      `}
                    />
                  )}
                </span>
              )}
            </Group>
            {!props.width && <ColumnResizer className={resizerStyles} />}
          </div>
        ),
      )}
    </AriaColumn>
  );
}

interface TableHeaderProps<T extends object> extends AriaTableHeaderProps<T> {
  dragColumnHeader?: React.ReactNode;
  dragColumnWidth?: number;
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  const { dragColumnHeader, dragColumnWidth, ...ariaProps } = props;
  const { selectionBehavior, selectionMode, allowsDragging } =
    useTableOptions();

  return (
    <AriaTableHeader
      {...ariaProps}
      className={composeTailwindRenderProps(
        ariaProps.className,
        `
          sticky top-0 z-10 rounded-t-lg border-b border-b-neutral-200 bg-neutral-100/60
          backdrop-blur-md
          supports-[-moz-appearance:none]:bg-neutral-100
          dark:border-b-neutral-700 dark:bg-neutral-700/60
          dark:supports-[-moz-appearance:none]:bg-neutral-700
          forced-colors:bg-[Canvas]
        `,
      )}
    >
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && (
        <Column width={dragColumnWidth} minWidth={dragColumnWidth}>
          {dragColumnHeader}
        </Column>
      )}
      {selectionBehavior === 'toggle' && (
        <AriaColumn
          width={36}
          minWidth={36}
          className="box-border cursor-default p-2 text-start text-sm font-semibold"
        >
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={ariaProps.columns}>{ariaProps.children}</Collection>
    </AriaTableHeader>
  );
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return (
    <AriaTableBody
      {...props}
      className="empty:text-center empty:text-sm empty:italic"
    />
  );
}

const rowStyles = tv({
  extend: focusRing,
  base: `
    group/row relative cursor-default text-sm text-neutral-900 -outline-offset-2 select-none
    last:rounded-b-lg
    hover:bg-neutral-100
    disabled:text-neutral-300
    dark:text-quanta-air dark:hover:bg-neutral-800 dark:disabled:text-neutral-600
    pressed:bg-neutral-100
    dark:pressed:bg-neutral-800
    selected:bg-quanta-sapphire selected:text-quanta-air selected:hover:bg-quanta-royal
    dark:selected:bg-quanta-sapphire dark:selected:hover:bg-quanta-royal
  `,
});

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <AriaRow id={id} {...otherProps} className={rowStyles}>
      {allowsDragging && (
        <Cell>
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
    </AriaRow>
  );
}

const cellStyles = tv({
  extend: focusRing,
  base: `
    box-border truncate border-b border-b-neutral-200 p-2 -outline-offset-2
    [--selected-border:var(--color-blue-200)]
    [-webkit-tap-highlight-color:transparent]
    group-last/row:border-b-0
    group-selected/row:border-(--selected-border)
    group-last/row:first:rounded-bl-lg group-last/row:last:rounded-br-lg
    dark:border-b-neutral-700 dark:[--selected-border:var(--color-blue-900)]
    [:is(:has(+[data-selected])_*)]:border-(--selected-border)
  `,
});

const expandButton = tv({
  extend: focusRing,
  base: `
    shrink-0 cursor-default border-0 bg-transparent p-0 pr-1 align-middle
    [-webkit-tap-highlight-color:transparent]
  `,
  variants: {
    isDisabled: {
      true: `
        text-neutral-300
        dark:text-neutral-600
        forced-colors:text-[GrayText]
      `,
    },
  },
});

const chevron = tv({
  base: `
    h-4.5 w-4.5 text-neutral-500 transition-transform duration-200 ease-in-out
    dark:text-neutral-400
  `,
  variants: {
    isExpanded: {
      true: 'rotate-90 transform',
    },
    isDisabled: {
      true: `
        text-neutral-300
        dark:text-neutral-600
        forced-colors:text-[GrayText]
      `,
    },
  },
});

export function Cell(props: CellProps) {
  return (
    <AriaCell
      {...props}
      className={cellStyles}
      style={({ hasChildItems, isTreeColumn, level }) => ({
        paddingInlineStart: isTreeColumn
          ? 4 + (hasChildItems ? 0 : 20) + (level - 1) * 16
          : undefined,
      })}
    >
      {composeRenderProps(
        props.children,
        (children, { hasChildItems, isTreeColumn, isExpanded, isDisabled }) => (
          <>
            {hasChildItems && isTreeColumn && (
              <Button slot="chevron" className={expandButton({ isDisabled })}>
                <ChevronrightIcon
                  aria-hidden
                  className={chevron({ isExpanded, isDisabled })}
                />
              </Button>
            )}
            {children}
          </>
        ),
      )}
    </AriaCell>
  );
}
