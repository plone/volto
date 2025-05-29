import React, {
  type ComponentProps,
  useEffect,
  useState,
  useMemo,
} from 'react';
import debounce from 'lodash.debounce';
// import type { ActionsResponse } from '@plone/types';
import { VisuallyHidden } from 'react-aria';
import {
  TooltipTrigger,
  useDragAndDrop,
  type Selection,
  DialogTrigger,
  MenuTrigger,
  Heading,
} from 'react-aria-components';
import { useMediaQuery } from 'usehooks-ts';
import {
  // AddIcon,
  Tooltip,
  Button,
  Table,
  ProgressBar,
  Modal,
  Dialog,
} from '@plone/components';
import { Container } from '@plone/components/tailwind';
import Breadcrumbs from '@plone/layout/components/Breadcrumbs';
import { TextField } from '@plone/cmsui/components/TextField/TextField';
import CollectionSVG from '@plone/components/icons/collection.svg?react';
import MoreOptionsSVG from '@plone/components/icons/more-options.svg?react';
import PasteSVG from '@plone/components/icons/paste.svg?react';

import type { ArrayElement, Brain } from '@plone/types';
import { ContentsCell } from './ContentsCell';
import { TableIndexesPopover } from './TableIndexesPopover';
import { RearrangePopover } from './RearrangePopover';
import { ContentsActions } from './ContentsActions';
// import { AddContentPopover } from './AddContentPopover';
import { useLoaderData, useNavigate } from 'react-router';
import type { ContentsLoaderType } from '../routes/contents';
import { useTranslation } from 'react-i18next';
import { useContentsContext } from '../providers/contents';
import '../styles/ContentsTable.css';

interface ContentsTableProps {
  pathname: string;
  // objectActions: ActionsResponse['object'];
  title: string;
  // loading: boolean;
  canPaste: boolean;
  // items: Brain[];
  indexes: {
    order: (keyof Brain)[];
    values: {
      [index: string]: {
        type: string;
        label: string;
        selected: boolean;
        sort_on?: string;
      };
    };
    selectedCount: number;
  };
  onSelectIndex: (index: string) => void;
  sortItems: (index: string) => void;
  upload: () => Promise<void>;
  rename: () => Promise<void>;
  workflow: () => Promise<void>;
  tags: () => Promise<void>;
  properties: () => Promise<void>;
  cut: (value?: string) => Promise<void>;
  copy: (value?: string) => Promise<void>;
  paste: () => Promise<void>;
  deleteItem: (value?: string) => Promise<void>;
  orderItem: (id: string, delta: number) => Promise<void>;
  moveToTop: (index: number) => Promise<void>;
  moveToBottom: (index: number) => Promise<void>;
  // addableTypes: ComponentProps<typeof AddContentPopover>['addableTypes'];
}

/**
 * A table showing the contents of an object.
 *
 * It has a toolbar for interactions with the items and a searchbar for filtering.
 * Items can be sorted by drag and drop.
 */
export function ContentsTable({
  pathname,
  // objectActions,
  canPaste,
  // items,
  indexes: baseIndexes,
  onSelectIndex,
  sortItems,
  upload,
  rename,
  workflow,
  tags,
  properties,
  cut,
  copy,
  paste,
  deleteItem,
  orderItem,
  moveToTop,
  moveToBottom, // addableTypes,
}: ContentsTableProps) {
  const isMobileScreenSize = useMediaQuery('(max-width: 992px)');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selected, setSelected } = useContentsContext();

  // const isLoading = contentIsLoading || searchIsLoading || bcIsLoading;
  const {
    breadcrumbs: brdcData,
    content,
    search,
    searchableText,
  } = useLoaderData<ContentsLoaderType>();

  const { title = '' } = content ?? {};
  const { items = [] } = search ?? {};
  const breadcrumbs = { ...brdcData };
  breadcrumbs.items = (brdcData?.items ?? []).map((item) => ({
    '@id': `/contents${item['@id']}`,
    title: item.title,
  }));
  breadcrumbs.root = `/contents${breadcrumbs.root}`;

  // const folderContentsActions = objectActions.find(
  //   (action) => action.id === 'folderContents',
  // );

  // if (!folderContentsActions) {
  //   // TODO current volto returns the Unauthorized component here
  //   // it would be best if the permissions check was done at a higher level
  //   // and this remained null
  //   return null;
  // }

  // TODO "id" is a reserved key for table rows, so we cannot add the "ID" column at this time
  const indexes = {
    ...baseIndexes,
    order: baseIndexes.order.filter((index) => index !== 'id'),
    values: Object.fromEntries(
      Object.entries(baseIndexes.values).filter(([key]) => key !== 'id'),
    ),
  };

  const columns = [
    {
      id: 'title',
      name: t('contents.indexes.title'),
      isRowHeader: true,
    },
    ...(!isMobileScreenSize
      ? indexes.order
          .filter((index) => indexes.values[index].selected)
          .map((index) => ({
            id: index,
            // TODO: use translation
            name: indexes.values[index].label,
          }))
      : []),
    {
      id: '_actions',
      name: !isMobileScreenSize ? (
        <DialogTrigger>
          <TooltipTrigger>
            <Button className="react-aria-Button actions-cell-header">
              <MoreOptionsSVG />
            </Button>
            <Tooltip placement="bottom">{t('Select columns to show')}</Tooltip>
          </TooltipTrigger>
          <TableIndexesPopover
            indexes={indexes}
            onSelectIndex={onSelectIndex}
          />
        </DialogTrigger>
      ) : canPaste ? (
        <TooltipTrigger>
          <Button
            className="react-aria-Button contents-action-trigger paste"
            onPress={paste}
            aria-label={t('contents.actions.paste')}
            isDisabled={!canPaste}
          >
            <PasteSVG />
          </Button>
          <Tooltip>{t('contents.actions.paste')}</Tooltip>
        </TooltipTrigger>
      ) : null,
    },
  ] as const;

  const rows = items.map((item, itemIndex) =>
    columns.reduce<ArrayElement<ComponentProps<typeof Table>['rows']>>(
      (cells, column) => ({
        ...cells,
        [column.id]: (
          <ContentsCell
            item={item}
            column={column.id}
            indexes={indexes}
            onMoveToBottom={() => moveToBottom(itemIndex)}
            onMoveToTop={() => moveToTop(itemIndex)}
            onCut={() => cut(item['@id'])}
            onCopy={() => copy(item['@id'])}
            onDelete={() => deleteItem(item['@id'])}
          />
        ),
      }),
      {
        id: item['@id'],
        // Automatic textValue generation does not work
        // because the title column is a ReactNode and not a string
        textValue: item.title,
      },
    ),
  );

  const { dragAndDropHooks } = useDragAndDrop({
    isDisabled: isMobileScreenSize || selected === 'all' || selected.size > 1,
    getItems: (keys) =>
      [...keys].map((key) => ({
        'text/plain': key.toString(),
      })),
    onReorder(e) {
      if (e.keys.size !== 1) {
        console.log('raise toast error');
        // toast.error(
        //   <Toast
        //     error
        //     title={t('contents.error')}
        //     content={t('contents.rearrange.error')}
        //   />,
        // );
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

      if (delta !== 0) {
        orderItem(item.id, delta);
      }
    },
  });

  //debounce search input
  const [searchInput, setSearchInput] = useState(searchableText ?? '');
  const debouncedSearchableText = useMemo(
    () =>
      debounce((text: string) => {
        setSelected('none');
        navigate(`${pathname}?SearchableText=${text}`);
      }, 500),
    [navigate, pathname],
  );
  useEffect(() => {
    if ((searchableText ?? '') != searchInput) {
      debouncedSearchableText(searchInput);
    }
  }, [searchInput]);

  if (false)
    return (
      <Modal isOpen={true}>
        <Dialog>
          <Heading slot="title">{t('contents.loading')}</Heading>
          <ProgressBar aria-label={t('contents.loading')} isIndeterminate />
        </Dialog>
      </Modal>
    );

  return (
    <Container
      width="layout"
      className="folder-contents"
      // aria-live="polite"
    >
      <article id="content">
        <section className="topbar">
          <div className="title-block">
            <Breadcrumbs
              includeRoot={true}
              root={breadcrumbs.root}
              items={breadcrumbs.items}
              className="react-aria-Breadcrumbs contents-breadcrumbs"
            />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="group flex end-block">
            {!isMobileScreenSize && (
              <ContentsActions
                upload={upload}
                rename={rename}
                workflow={workflow}
                tags={tags}
                properties={properties}
                cut={cut}
                copy={copy}
                paste={paste}
                deleteItem={deleteItem}
                canPaste={canPaste}
                selected={selected}
              />
            )}
            <TextField
              name="sortable_title"
              placeholder={t('contents.actions.filter')}
              value={searchInput ?? ''}
              onChange={(v) => {
                setSearchInput(v);
              }}
            />

            {/* <TooltipTrigger>
            <DialogTrigger>
              <Button className="react-aria-Button add">
                <AddIcon />
              </Button>
              <AddContentPopover path={path} addableTypes={addableTypes} />
            </DialogTrigger>
            <Tooltip placement="bottom">
              Add content
            </Tooltip>
          </TooltipTrigger> */}
          </div>
        </section>
        <section className="contents-table">
          <VisuallyHidden>
            <span aria-live="polite">
              {t('contents.results', { count: items.length })}
            </span>
          </VisuallyHidden>
          {rows?.length > 0 ? (
            <Table
              className="react-aria-Table hoverable"
              aria-label={t('contents.results.contents_of', { title })}
              columns={[...columns]}
              rows={rows}
              selectionMode={!isMobileScreenSize ? 'multiple' : undefined}
              selectedKeys={selected}
              onSelectionChange={setSelected}
              dragAndDropHooks={dragAndDropHooks}
              dragColumnHeader={
                <MenuTrigger>
                  <TooltipTrigger>
                    <Button className="react-aria-Button drag-cell-header">
                      <CollectionSVG />
                    </Button>
                    <Tooltip
                      className="react-aria-Tooltip tooltip"
                      placement="bottom"
                    >
                      {t('contents.rearrange.by')}
                    </Tooltip>
                  </TooltipTrigger>
                  <RearrangePopover
                    indexes={indexes.values}
                    sortItems={sortItems}
                  />
                </MenuTrigger>
              }
              // onRowSelection={onRowSelection}
              // resizableColumns={true}
            />
          ) : (
            <div className="empty-state">
              <div className="text-1xl text-center">
                {t('contents.results.no_results')}
              </div>
            </div>
          )}
        </section>
      </article>
    </Container>
  );
}
