import React, { type ReactNode } from 'react';
import {
  type TableProps as RACTableProps,
  ResizableTableContainer,
  ColumnResizer,
  Table as RACTable,
  TableBody,
  Cell,
} from 'react-aria-components';
import { TableHeader } from './TableHeader';
import { Column } from './Column';
import { Row } from './Row';

interface ColumnType {
  id: string;
  name: string;
  isRowHeader?: boolean;
  // TODO support width constraints for resizable columns
}

interface RowType {
  id: string;
  [key: string]: ReactNode; // TODO can we make this more specific?
}

interface TableProps<C, R> extends RACTableProps {
  columns?: C[];
  rows?: R[];
  resizableColumns?: boolean;
  // TODO maybe a custom "selectall" component? Is it doable with react-aria-components?
}

/**
 * A wrapper around the `react-aria-components` Table component.
 *
 * See https://react-spectrum.adobe.com/react-aria/Table.html
 */
export function Table<C extends ColumnType, R extends RowType>({
  columns,
  rows,
  resizableColumns,
  ...otherProps
}: TableProps<C, R>) {
  let table = null;
  if (Array.isArray(columns) && Array.isArray(rows)) {
    table = (
      <RACTable {...otherProps}>
        <TableHeader columns={columns}>
          {(column) => (
            <Column isRowHeader={column.isRowHeader}>
              {resizableColumns && (
                <div className="flex-wrapper">
                  <span tabIndex={-1} className="column-name">
                    {column.name}
                  </span>
                  <ColumnResizer />
                </div>
              )}
              {!resizableColumns && column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <Row columns={columns}>
              {(column) => <Cell>{item[column.id]}</Cell>}
            </Row>
          )}
        </TableBody>
      </RACTable>
    );
  } else {
    table = <RACTable {...otherProps} />;

    if (Array.isArray(columns)) {
      console.warn('The Table component was given columns but no rows');
    } else if (Array.isArray(rows)) {
      console.warn('The Table component was given rows but no columns');
    }
  }

  if (resizableColumns) {
    return <ResizableTableContainer>{table}</ResizableTableContainer>;
  } else {
    return table;
  }
}
