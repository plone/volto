import {
  type TableProps as RACTableProps,
  ResizableTableContainer,
  ColumnResizer,
  Table as RACTable,
  TableBody,
  Cell,
} from 'react-aria-components';
import './Table.scss';
import TableHeader from './TableHeader';
import Column from './Column';
import Row from './Row';

interface ColumnType {
  id: string;
  name: string;
  isRowHeader?: boolean;
}

interface RowType {
  id: string;
  [key: string]: string; // TODO can we make this more specific?
}

interface TableProps<C, R> extends RACTableProps {
  columns: C[];
  rows: R[];
}

/**
 * A wrapper around the `react-aria-components` Table component.
 *
 * See https://react-spectrum.adobe.com/react-aria/Table.html
 */
export default function Table<C extends ColumnType, R extends RowType>({
  columns,
  rows,
  ...otherProps
}: TableProps<C, R>) {
  return (
    <ResizableTableContainer>
      <RACTable {...otherProps}>
        <TableHeader columns={columns}>
          {(column) => (
            <Column isRowHeader={column.isRowHeader}>
              {column.name}
              <ColumnResizer />
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
    </ResizableTableContainer>
  );
}
