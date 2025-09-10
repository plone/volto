import { type ComponentProps, useEffect, useState } from 'react';
import { VisuallyHidden } from 'react-aria';
import {
  TooltipTrigger,
  useDragAndDrop,
  DialogTrigger,
  MenuTrigger,
  ProgressBar,
} from 'react-aria-components';
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from 'react-router';
import { useDebounceCallback, useMediaQuery } from 'usehooks-ts';
import { Tooltip, Table } from '@plone/components';
import {
  Button,
  Container,
  Breadcrumbs,
  Breadcrumb,
} from '@plone/components/quanta';
import {
  AddIcon,
  HomeIcon,
  CollectionIcon,
  MoreoptionsIcon,
  PasteIcon,
  CopyIcon,
  CutIcon,
} from '@plone/components/Icons';
import { TextField } from '@plone/cmsui/components/TextField/TextField';
import type { RootLoader } from 'seven/app/root';
import type { ArrayElement, Brain } from '@plone/types';

import Topbar from '../Topbar';
import { ContentsCell } from '../ContentsCell/ContentsCell';
import { TableIndexesPopover } from '../TableIndexesPopover/TableIndexesPopover';
import { RearrangePopover } from '../RearrangePopover/RearrangePopover';
import { ContentsActions } from '../ContentsActions/ContentsActions';
import { AddContentPopover } from '../AddContentPopover/AddContentPopover';
import type { ContentsLoaderType } from '../../routes/contents';
import { useTranslation } from 'react-i18next';
import { useContentsContext } from '../../providers/contents';
import { clipboardKey } from '../../config/constants';
import IconButton from '../IconButton';
import { type ToastItem } from '@plone/layout/config/toast';

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
  // cut: (item?: object) => Promise<void>;
  // copy: (item?: object) => Promise<void>;
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
  const { selected, setSelected, setShowDelete, setItemsToDelete, showToast } =
    useContentsContext();
  const fetcher = useFetcher();
  const { addableTypes, search, searchableText } =
    useLoaderData<ContentsLoaderType>();
  const rootData = useRouteLoaderData<RootLoader>('root');

  const { content } = rootData ?? {};
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
  };

  const moveToBottom = (item: Item) => orderItem(item.id, 'bottom');
  const moveToTop = (item: Item) => orderItem(item.id, 'top');

  type ClipboardType = {
    action: 'cut' | 'copy' | null;
    source: string[];
    expiration: number;
    items: any[];
  };

  const showClipboardActionToast = (data: ClipboardType, toastConfig: any) => {
    const l = data?.items?.length;
    if (l > 0) {
      if (l > 1) {
        Object.keys(toastConfig).forEach(
          (action) =>
            (toastConfig[action].title =
              `${toastConfig[action].title}_multiple`),
        );
      }

      const title = l > 1 ? undefined : data.items[0].title;

      const toastContent: ToastItem = data.action
        ? toastConfig[data.action]
        : null;

      if (toastContent) {
        showToast({
          title: t(toastContent.title, {
            number: l,
            title,
          }),
          icon: toastContent.icon,
        });
      }
    }
  };

  // TODO try making a custom hook for the clipboard
  const [clipboard, _setClipboard] = useState<ClipboardType>({
    action: null,
    source: [],
    expiration: 0,
    items: [],
  });

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

  const setClipboard: typeof _setClipboard = (value: any) => {
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

    // show toast
    if (value.action) {
      showClipboardActionToast(value, {
        copy: {
          title: 'contents.actions.copied',
          icon: <CopyIcon />,
        },
        cut: {
          title: 'contents.actions.cutted',
          icon: <CutIcon />,
        },
      });
    }
    // TODO when do we clean the clipboard?
  };

  const cut = (item?: Brain) => {
    const items = item ? [item] : [...selected];
    const paths = items.map((i) => i['@id']);

    setClipboard({
      action: 'cut',
      source: paths,
      items,
      expiration: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiration
    });
    setSelected('none');
  };

  const copy = (item?: Brain) => {
    const items = item ? [item] : [...selected];
    const paths = items.map((i) => i['@id']);

    setClipboard({
      action: 'copy',
      source: paths,
      items,
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
    // TODO when do we clean the clipboard?
  };

  // handle Toast success on paste, cut, delete
  useEffect(() => {
    if (fetcher.state === 'submitting' || fetcher.state == 'loading') {
      // TODO: handle loading state, show something like a dimmer while operation is in progress
    } else if (fetcher.state == 'idle') {
      const data = fetcher.data;

      // Show toast for copy+paste and cut+paste
      showClipboardActionToast(data, {
        copy: {
          title: 'contents.actions.pasted',
          icon: <PasteIcon />,
        },
        cut: {
          title: 'contents.actions.pasted',
          icon: <PasteIcon />,
        },
      });
    }
    // // La richiesta è terminata. Controlla se la action è stata eseguita.
    // if (fetcher.state === 'idle' && fetcher.submission) {
    //   // Ottieni l'azione della richiesta appena completata.
    //   const actionPath = fetcher.submission.action;
    //   // Se l'azione completata è quella di "paste"...
    //   if (actionPath.startsWith('/@@contents/@@paste')) {
    //     // ...allora gestisci il risultato specifico per il paste.
    //     if (fetcher.data && fetcher.data.error) {
    //       console.error("Errore durante l'incolla:", fetcher.data.error);
    //       // Mostra un toast di errore
    //     } else {
    //       console.log('Incolla completato con successo!');
    //       // Mostra un toast di successo
    //     }
    //   }
    //   // Puoi aggiungere altri blocchi `if` per le altre azioni
    //   // else if (actionPath.startsWith('/@@contents/@@delete')) {
    //   //   // Gestisci il risultato dell'azione di eliminazione
    //   //   // ...
    //   // }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.state]);

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
            <IconButton className="actions-cell-header">
              <MoreoptionsIcon />
            </IconButton>
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
            onCut={() => cut(item)}
            onCopy={() => copy(item)}
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
        showToast({
          title: t('contents.error'),
          description: t('contents.rearrange.error'),
        });
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
      <article id="content" className="mx-auto px-4 py-2 lg:px-8">
        <Topbar>
          <div className="title-block flex-auto">
            <Breadcrumbs
              items={breadcrumbs}
              className="text-quanta-sapphire contents-breadcrumbs"
            >
              {(item) => (
                <Breadcrumb
                  id={item['@id']}
                  href={item['@id']}
                  className="text-quanta-sapphire decoration-quanta-sapphire/50 hover:decoration-quanta-sapphire"
                >
                  {item.title}
                </Breadcrumb>
              )}
            </Breadcrumbs>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="group ms-auto flex flex-shrink-0 flex-grow basis-0 flex-wrap-reverse items-center justify-end gap-4 self-end">
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
              aria-label={t('contents.actions.filter')}
            />

            <TooltipTrigger>
              <DialogTrigger>
                <Button
                  variant="primary"
                  className="bg-quanta-sapphire hover:bg-quanta-royal text-quanta-air hover:text-quanta-air active:text-quanta-air focus:text-quanta-air cursor-pointer rounded-full border-0 p-1.5 outline-offset-2"
                >
                  <AddIcon />
                </Button>
                <AddContentPopover
                  path={pathname}
                  contentTitle={content?.title ?? ''}
                  addableTypes={addableTypes}
                />
              </DialogTrigger>
              <Tooltip placement="bottom">{t('contents.actions.add')}</Tooltip>
            </TooltipTrigger>
          </div>
        </Topbar>
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
                    <IconButton className="drag-cell-header">
                      <CollectionIcon />
                    </IconButton>
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
              <div className="text-center text-xl">
                {t('contents.results.no_results')}
              </div>
            </div>
          )}
        </section>
      </article>
    </Container>
  );
}
