import {
  createColumnHelper,
  type Row,
  flexRender,
} from '@tanstack/react-table';
import type { Brain } from '@plone/types/src/content/brains';

const columnHelper = createColumnHelper<Brain>();

export const defaultColumns = [
  columnHelper.display({
    id: 'controls',
    header: ({ table }) => <span>C</span>,
    cell: ({ row }) => <td></td>,
  }),
];
