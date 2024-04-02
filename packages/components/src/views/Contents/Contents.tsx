'use client';

import React from 'react';
import type { ActionsResponse } from '@plone/types';
import { ComponentProps, ReactNode, useState } from 'react';
import {
  DialogTrigger,
  Tooltip,
  TooltipTrigger,
  useDragAndDrop,
} from 'react-aria-components';
import cx from 'classnames';
import type { Brain } from '@plone/types/src/content/brains';
import { AddIcon } from '../../components/Icons';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../../components/Button/Button';
import { Container } from '../../components/Container/Container';
import { QuantaTextField } from '../../components/quanta/TextField/TextField';
import { Table } from '../../components/Table/Table';
import { ContentsCell } from './ContentsCell';
import { AddContentPopover } from './AddContentPopover';
import { indexes, defaultIndexes } from '../../helpers/indexes';
import type { ArrayElement } from '../../helpers/types';

interface ContentsProps {
  pathname: string;
  breadcrumbs: ComponentProps<typeof Breadcrumbs>['items'];
  objectActions: ActionsResponse['object'];
  loading: boolean;
  title: string;
  items: Brain[];
  orderContent: (baseUrl: string, id: string, delta: number) => Promise<void>;
  addableTypes: ComponentProps<typeof AddContentPopover>['addableTypes'];
}

/**
 * A table showing the contents of an object.
 *
 * It has a toolbar for interactions with the items and a searchbar for filtering.
 * Items can be sorted by drag and drop.
 */
export default function Contents({
  pathname,
  breadcrumbs = [],
  objectActions,
  loading,
  title,
  items,
  orderContent,
  addableTypes,
}: ContentsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  // const path = getBaseUrl(pathname);
  const path = pathname;

  const folderContentsActions = objectActions.find(
    (action) => action.id === 'folderContents',
  );

  if (!folderContentsActions) {
    // TODO current volto returns the Unauthorized component here
    // it would be best if the permissions check was done at a higher level
    // and this remained null
    return null;
  }

  const columns = [
    {
      id: 'title',
      name: 'Title',
      isRowHeader: true,
    },
    ...defaultIndexes.map((index) => ({
      id: index,
      name: indexes[index].label,
    })),
    {
      id: '_actions',
      name: 'Actions',
    },
  ] as const;

  const rows = items.map((item) =>
    columns.reduce<ArrayElement<ComponentProps<typeof Table>['rows']>>(
      (cells, column) => ({
        ...cells,
        [column.id]: (
          <ContentsCell key={column.id} item={item} column={column.id} />
        ),
      }),
      { id: item['@id'] },
    ),
  );

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        'text/plain': key.toString(),
      })),
    onReorder(e) {
      if (e.keys.size !== 1) {
        // TODO mostrare toast o rendere non ordinabile quando più di un elemento è selezionato
        console.error('Only one item can be moved at a time');
        return;
      }
      const target = [...e.keys][0];
      if (target === e.target.key) return;

      const item = items.find((item) => item['@id'] === target);
      if (!item) return;

      const initialPosition = rows.findIndex((row) => row.id === item['@id']);
      if (initialPosition === -1) return;

      const finalPosition = rows.findIndex((row) => row.id === e.target.key);

      let delta = finalPosition - initialPosition;
      if (delta > 0 && e.target.dropPosition === 'before') delta -= 1;
      if (delta < 0 && e.target.dropPosition === 'after') delta += 1;

      // if (delta !== 0) {
      //   orderItem(item.id, delta);
      // }

      orderContent(
        path,
        item.id.replace(/^.*\//, ''),
        finalPosition - initialPosition,
      );
    },
  });

  return (
    <Container
      as="div"
      // id="page-contents"
      className="folder-contents"
      aria-live="polite"
    >
      {/* TODO better loader */}
      {loading && <p>Loading...</p>}
      {/* TODO helmet setting title here... or should we do it at a higher level? */}
      <article id="content">
        <section className="topbar">
          <div className="title-block">
            <Breadcrumbs
              includeRoot={true}
              root="/contents"
              items={[...breadcrumbs].slice(0, -1)}
            />
            <h1>{[...breadcrumbs].slice(-1)[0]?.title}</h1>
          </div>
          <QuantaTextField
            name="sortable_title"
            placeholder="Search site"
            className="search-input"
          />
          <TooltipTrigger>
            <DialogTrigger>
              <Button className="react-aria-Button add">
                <AddIcon />
              </Button>
              <AddContentPopover addableTypes={addableTypes} />
            </DialogTrigger>
            <Tooltip className="react-aria-Tooltip tooltip" placement="bottom">
              Add content
            </Tooltip>
          </TooltipTrigger>
        </section>
        <section className="contents-table">
          <Table
            columns={[...columns]}
            rows={rows}
            selectionMode="multiple"
            dragAndDropHooks={dragAndDropHooks}
            // onRowSelection={onRowSelection}
            // resizableColumns={true}
          />
        </section>
      </article>
    </Container>
  );
}
