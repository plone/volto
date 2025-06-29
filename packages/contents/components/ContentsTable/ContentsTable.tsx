import { type ComponentProps, useEffect, useState } from 'react';
import { VisuallyHidden } from 'react-aria';
import {
  TooltipTrigger,
  useDragAndDrop,
  DialogTrigger,
  MenuTrigger,
} from 'react-aria-components';
import { useDebounceCallback, useMediaQuery } from 'usehooks-ts';
import { Tooltip, Button, Table } from '@plone/components';
import { Container, Breadcrumbs, Breadcrumb } from '@plone/components/quanta';
import {
  HomeIcon,
  CollectionIcon,
  MoreoptionsIcon,
  PasteIcon,
} from '@plone/components/Icons';
import { TextField } from '@plone/cmsui/components/TextField/TextField';

import type { ArrayElement, Brain } from '@plone/types';
import { ContentsCell } from '../ContentsCell/ContentsCell';
import { TableIndexesPopover } from '../TableIndexesPopover/TableIndexesPopover';
import { RearrangePopover } from '../RearrangePopover/RearrangePopover';
import { ContentsActions } from '../ContentsActions/ContentsActions';
// import { AddContentPopover } from './AddContentPopover/AddContentPopover';
import { useFetcher, useLoaderData, useNavigate } from 'react-router';
import type { ContentsLoaderType } from '../../routes/contents';
import { useTranslation } from 'react-i18next';
import { useContentsContext } from '../../providers/contents';
import { clipboardKey } from '../../config/constants';

import './ContentsTable.css';

interface ContentsTableProps {
  pathname: string;
  // objectActions: ActionsResponse['object'];
  title: string;
  // loading: boolean;
  // canPaste: boolean;
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
  // cut: (value?: string) => Promise<void>;
  // copy: (value?: string) => Promise<void>;
  // paste: () => Promise<void>;
  // orderItem: (id: string, delta: number) => Promise<void>;
  // moveToTop: (index: number) => Promise<void>;
  // moveToBottom: (index: number) => Promise<void>;
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
  // canPaste,
  // items,
  indexes: baseIndexes,
  onSelectIndex,
  sortItems,
  upload,
  rename,
  workflow,
  tags,
  properties,
  // cut,
  // copy,
  // paste,
  // orderItem,
  // moveToTop,
  // moveToBottom,
  // addableTypes,
}: ContentsTableProps) {
  const isMobileScreenSize = useMediaQuery('(max-width: 992px)');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selected, setSelected, setShowDelete, setItemsToDelete } =
    useContentsContext();
  const fetcher = useFetcher();
  const { content, search, searchableText } =
    useLoaderData<ContentsLoaderType>();

  const { title = '' } = content ?? {};
  const { items = [] } = search ?? {};
  type Item = ArrayElement<typeof items>;

  const breadcrumbsItems = (
    content?.['@components']?.breadcrumbs.items ?? []
  ).map((item) => ({
    '@id': `/@@contents${item['@id']}`,
    title: item.title,
  }));
  const breadcrumbsRoot = content?.['@components']?.breadcrumbs.root ?? '';
  const breadcrumbsRootItem = {
    '@id': `/@@contents${breadcrumbsRoot}`,
    title: 'Home',
    icon: <HomeIcon size="sm" />,
  };

  const breadcrumbs = [breadcrumbsRootItem, ...breadcrumbsItems];

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

  const deleteItem = (item?: Item | null) => {
    setShowDelete(true);
    setItemsToDelete(item ? new Set([item]) : selected);
  };

  const orderItem = async (id: string, delta: number | 'bottom' | 'top') => {
    await fetcher.submit(
      {
        path: pathname,
        obj_id: id,
        delta,
      },
      {
        method: 'PATCH',
        encType: 'application/json',
        action: `/@@contents/@@order`,
      },
    );
    // TODO handle loading state, show something like a dimmer while operation is in progress
  };

  const moveToBottom = (item: Item) => orderItem(item.id, 'bottom');
  const moveToTop = (item: Item) => orderItem(item.id, 'top');

  const [clipboard, _setClipboard] = useState<{
    action: 'cut' | 'copy' | null;
    source: string[];
    expiration: number;
  }>({ action: null, source: [], expiration: 0 });

  useEffect(() => {
    try {
      const storedClipboard = localStorage.getItem(clipboardKey);
      if (storedClipboard) {
        const parsedClipboard = JSON.parse(storedClipboard);
        if (parsedClipboard.expiration < Date.now()) {
          localStorage.removeItem(clipboardKey);
        } else if (
          parsedClipboard &&
          typeof parsedClipboard === 'object' &&
          'action' in parsedClipboard &&
          Array.isArray(parsedClipboard.source)
        ) {
          _setClipboard(parsedClipboard);
        } else {
          localStorage.removeItem(clipboardKey);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error reading clipboard from localStorage:', error);
      localStorage.removeItem(clipboardKey);
    }
  }, []);

  const setClipboard: typeof _setClipboard = (value) => {
    _setClipboard(value);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(clipboardKey, JSON.stringify(value));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error saving clipboard to localStorage:', error);
        localStorage.removeItem(clipboardKey);
      }
    }
    // TODO when do we clean the clipboard?
  };

  const cut = (path?: string) => {
    setClipboard({
      action: 'cut',
      source: path ? [path] : [...selected].map((i) => i['@id']),
      expiration: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
    });
    setSelected('none');
  };

  const copy = (path?: string) => {
    setClipboard({
      action: 'copy',
      source: path ? [path] : [...selected].map((i) => i['@id']),
      expiration: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
    });
    setSelected('none');
  };

  const canPaste = clipboard.action !== null && clipboard.source.length > 0;

  const paste = async () => {
    await fetcher.submit(clipboard, {
      method: 'POST',
      encType: 'application/json',
      action: `/@@contents/@@paste${pathname}`,
    });
    // TODO handle loading state, show something like a dimmer while operation is in progress
    // TODO when do we clean the clipboard?
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
              <MoreoptionsIcon />
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
            // isDisabled={!canPaste}
          >
            <PasteIcon />
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
            onMoveToBottom={() => moveToBottom(item)}
            onMoveToTop={() => moveToTop(item)}
            onCut={() => cut(item['@id'])}
            onCopy={() => copy(item['@id'])}
            onDelete={async () => deleteItem(item)}
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
    isDisabled: isMobileScreenSize || selected.size > 1,
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

  //search input and debounce it
  const [searchInput, setSearchInput] = useState(searchableText ?? '');

  const debouncedSearchableText = useDebounceCallback((text: string) => {
    setSelected('none');
    navigate(`/@@contents${pathname}?SearchableText=${text}`);
  }, 500);

  useEffect(() => {
    if ((searchableText ?? '') !== searchInput) {
      debouncedSearchableText(searchInput);
    }
  }, [debouncedSearchableText, searchInput, searchableText]);

  return (
    <Container
      width="layout"
      className="folder-contents"
      // aria-live="polite"
    >
      <article id="content">
        <section className="topbar">
          <div className="title-block">
            <Breadcrumbs items={breadcrumbs}>
              {(item) => (
                <Breadcrumb id={item['@id']} href={item['@id']}>
                  {item.title}
                </Breadcrumb>
              )}
            </Breadcrumbs>
            <h1>{title}</h1>
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
                // selected={selected}
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
              selectedKeys={[...selected].map((s) => s['@id'])}
              onSelectionChange={setSelected}
              dragAndDropHooks={dragAndDropHooks}
              dragColumnHeader={
                <MenuTrigger>
                  <TooltipTrigger>
                    <Button className="react-aria-Button drag-cell-header">
                      <CollectionIcon />
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
