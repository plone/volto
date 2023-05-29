import React, { useMemo } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { getContentIcon } from '@plone/volto/helpers';
import { Icon, Circle, FormattedDate } from '@plone/volto/components';
import {
  MenuTrigger,
  Button,
  Popover,
  Menu,
  Item,
} from 'react-aria-components';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import moreSVG from '@plone/volto/icons/more.svg';
import checkboxUncheckedSVG from '@plone/volto/icons/checkbox-unchecked.svg';
import checkboxCheckedSVG from '@plone/volto/icons/checkbox-checked.svg';
import cutSVG from '@plone/volto/icons/cut.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import copySVG from '@plone/volto/icons/copy.svg';
import showSVG from '@plone/volto/icons/show.svg';
import moveUpSVG from '@plone/volto/icons/move-up.svg';
import moveDownSVG from '@plone/volto/icons/move-down.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import cx from 'classnames';

const columnHelper = createColumnHelper();

function getColor(string) {
  switch (string) {
    case 'private':
      return '#ed4033';
    case 'published':
      return '#007bc1';
    case 'intranet':
      return '#51aa55';
    case 'draft':
      return '#f6a808';
    default:
      return 'grey';
  }
}

const COLUMNS = [
  columnHelper.accessor('title', {
    id: 'title',
    header: () => <span>Title</span>,
    cell: (row) => (
      <div>
        <div className="expire-align">
          <Icon
            name={getContentIcon(
              row.row.original['@type'],
              row.row.original.is_folderish,
            )}
            size="20px"
            className="icon-margin"
            color="#878f93"
            title={row.row.original['Type'] || row.row.original['@type']}
          />{' '}
          <span title={row.row.original.title}> {row.row.original.title}</span>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('review_state', {
    id: 'review_state',
    header: () => <span>Review state</span>,
    cell: (row) => (
      <div>
        <span>
          <Circle color={getColor(row.row.original.review_state)} size="15px" />
        </span>
        {row.row.original.review_state}
      </div>
    ),
  }),
  columnHelper.accessor('modified', {
    id: 'modified',
    header: () => <span>Last Modified</span>,
    cell: (row) => (
      <div>
        <FormattedDate date={row.row.original.ModificationDate} />
      </div>
    ),
  }),
  columnHelper.accessor('Publication Date', {
    id: 'Publication Date',
    header: () => <span>Publication Date</span>,
    cell: (row) => <div>{row.row.original.EffectiveDate}</div>,
  }),
  columnHelper.accessor('action', {
    id: 'action',
    header: () => <span>Action</span>,
    cell: (row) => (
      <div>
        <MenuTrigger>
          <Button aria-label="Menu">☰</Button>
          <Popover>
            <Menu onAction={alert}>
              <Item className="right-dropdown icon-align">
                <Icon name={cutSVG} color="#007eb1" size="24px" /> Cut
              </Item>
              <Item className="right-dropdown icon-align">
                <Icon name={copySVG} color="#007eb1" size="24px" /> copy
              </Item>
              <Item className="right-dropdown icon-align">
                <Icon name={deleteSVG} color="#e40166" size="24px" /> Delete
              </Item>
              <Item className="right-dropdown icon-align">
                <Icon name={moveUpSVG} color="#007eb1" size="24px" /> Move to
                top of folder
              </Item>
              <Item className="right-dropdown icon-align">
                <Icon name={moveDownSVG} color="#007eb1" size="24px" /> Move to
                bottom of folder
              </Item>
            </Menu>
          </Popover>
        </MenuTrigger>
      </div>
    ),
  }),
];

export const BasicTable = ({ data, ...props }) => {
  const columns = useMemo(() => COLUMNS, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
