import React, { type ComponentProps } from 'react';
import './Contents.css';
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
import { useMutation } from '@tanstack/react-query';
import {
  // AddIcon,
  Breadcrumbs,
  CollectionIcon,
  Container,
  MoreoptionsIcon,
  PasteIcon,
  QuantaTextField,
  Tooltip,
  Button,
  Table,
  Toast,
  ProgressBar,
  Modal,
  Dialog,
} from '@plone/components';
import { usePloneClient } from '@plone/providers';
import type { ArrayElement, Brain } from '@plone/types';
import { ContentsCell } from './ContentsCell';
import { TableIndexesPopover } from './TableIndexesPopover';
import { RearrangePopover } from './RearrangePopover';
import { ContentsActions } from './ContentsActions';
// import { AddContentPopover } from './AddContentPopover';
import { useCopyOrCut } from '../helpers/useCopyOrCut';
import { usePaste } from '../helpers/usePaste';
import { useContentsContext } from '../providers/contents';
import {
  useBreadcrumbsQuery,
  useContentQuery,
  useSearchQuery,
} from './queries';

interface ContentsTableProps {
  pathname: string;
  // objectActions: ActionsResponse['object'];
  title: string;
  textFilter: string;
  onChangeTextFilter: (value: string) => void;
  selected: Selection;
  setSelected: (value: Selection) => void;
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
  deleteItem: (value?: string) => Promise<void>;
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
  textFilter,
  onChangeTextFilter,
  selected,
  setSelected,
  indexes: baseIndexes,
  onSelectIndex,
  sortItems,
  upload,
  rename,
  workflow,
  tags,
  properties,
  deleteItem,
  // addableTypes,
}: ContentsTableProps) {
  const { intl, toast, flattenToAppURL } = useContentsContext();
  const isMobileScreenSize = useMediaQuery('(max-width: 992px)');
  const { updateContentMutation } = usePloneClient();
  const [copyOrCut, setCopyOrCut] = useCopyOrCut();
  const { paste, isPending: pasteIsPending } = usePaste(pathname);

  const { data: contentData, isLoading: contentIsLoading } =
    useContentQuery(pathname);

  const { data: bcData, isLoading: bcIsLoading } =
    useBreadcrumbsQuery(pathname);

  const {
    data: searchData,
    isLoading: searchIsLoading,
    refetch: searchRefetch,
  } = useSearchQuery(pathname, textFilter);

  const { mutate: orderItem, isPending: orderIsPending } = useMutation(
    updateContentMutation(),
  );

  const isLoading =
    contentIsLoading ||
    searchIsLoading ||
    bcIsLoading ||
    orderIsPending ||
    pasteIsPending;

  const canPaste = copyOrCut.data.length > 0;

  const { title = '' } = contentData ?? {};
  const { items = [] } = searchData ?? {};
  const breadcrumbs = (bcData?.items ?? []).map((item) => ({
    '@id': `${flattenToAppURL(item['@id'])}/contents`,
    title: item.title,
  }));

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
      name: intl.formatMessage({ id: 'Title' }),
      isRowHeader: true,
    },
    ...(!isMobileScreenSize
      ? indexes.order
          .filter((index) => indexes.values[index].selected)
          .map((index) => ({
            id: index,
            name: intl.formatMessage({ id: indexes.values[index].label }),
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
            <Tooltip className="react-aria-Tooltip tooltip" placement="bottom">
              {intl.formatMessage({
                id: 'contentsNextSelectColumnsToDisplay',
              })}
            </Tooltip>
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
            onPress={() =>
              paste({
                onSuccess: searchRefetch,
              })
            }
            aria-label={intl.formatMessage({ id: 'Paste' })}
            isDisabled={!canPaste}
          >
            <PasteIcon />
          </Button>
          <Tooltip placement="bottom">
            {intl.formatMessage({ id: 'Paste' })}
          </Tooltip>
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
            onMoveToBottom={() =>
              orderItem(
                {
                  path: pathname,
                  data: { ordering: { obj_id: item.id, delta: 'bottom' } },
                },
                {
                  onSuccess: () => {
                    searchRefetch();
                  },
                },
              )
            }
            onMoveToTop={() =>
              orderItem(
                {
                  path: pathname,
                  data: { ordering: { obj_id: item.id, delta: 'top' } },
                },
                {
                  onSuccess: () => {
                    searchRefetch();
                  },
                },
              )
            }
            onCut={() => {
              setCopyOrCut({
                op: 'cut',
                data: [item['@id']],
              });
              setSelected(new Set());
              toast.success(
                <Toast
                  success
                  title={intl.formatMessage({ id: 'Success' })}
                  content={intl.formatMessage({
                    id: 'Item(s) cut.',
                  })}
                />,
              );
            }}
            onCopy={() => {
              setCopyOrCut({
                op: 'copy',
                data: [item['@id']],
              });
              setSelected(new Set());
              toast.success(
                <Toast
                  success
                  title={intl.formatMessage({ id: 'Success' })}
                  content={intl.formatMessage({
                    id: 'Item(s) copied.',
                  })}
                />,
              );
            }}
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
        toast.error(
          <Toast
            error
            title={intl.formatMessage({ id: 'Error' })}
            content={intl.formatMessage({
              id: 'contentsMultipleItemsMovedError',
            })}
          />,
        );
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
        orderItem(
          {
            path: pathname,
            data: { ordering: { obj_id: item.id, delta } },
          },
          {
            onSuccess: () => {
              searchRefetch();
            },
          },
        );
      }
    },
  });

  return (
    <Container
      as="div"
      // id="page-contents"
      className="folder-contents"
      // aria-live="polite"
      layout={false}
      narrow={false}
    >
      {isLoading && (
        <Modal isOpen={true}>
          <Dialog>
            <Heading slot="title">
              {intl.formatMessage({ id: 'loading' })}
            </Heading>
            <ProgressBar
              aria-label={intl.formatMessage({ id: 'loading' })}
              isIndeterminate
            />
          </Dialog>
        </Modal>
      )}
      <article id="content">
        <section className="topbar">
          <div className="title-block">
            <Breadcrumbs
              includeRoot={true}
              root="/contents"
              items={breadcrumbs}
            />
            <h1>{title}</h1>
          </div>
          {!isMobileScreenSize && (
            <ContentsActions
              upload={upload}
              rename={rename}
              workflow={workflow}
              tags={tags}
              properties={properties}
              cut={() => {
                setCopyOrCut({
                  op: 'cut',
                  data:
                    selected === 'all'
                      ? items.map((item) => item['@id'])
                      : [...selected].map((key) => key.toString()),
                });
                setSelected(new Set());
                toast.success(
                  <Toast
                    success
                    title={intl.formatMessage({ id: 'Success' })}
                    content={intl.formatMessage({
                      id: 'Item(s) cut.',
                    })}
                  />,
                );
              }}
              copy={() => {
                setCopyOrCut({
                  op: 'copy',
                  data:
                    selected === 'all'
                      ? items.map((item) => item['@id'])
                      : [...selected].map((key) => key.toString()),
                });
                setSelected(new Set());
                toast.success(
                  <Toast
                    success
                    title={intl.formatMessage({ id: 'Success' })}
                    content={intl.formatMessage({
                      id: 'Item(s) copied.',
                    })}
                  />,
                );
              }}
              paste={() =>
                paste({
                  onSuccess: searchRefetch,
                })
              }
              deleteItem={deleteItem}
              canPaste={canPaste}
              selected={selected}
            />
          )}
          <QuantaTextField
            name="sortable_title"
            placeholder={intl.formatMessage({ id: 'Filter…' })}
            className="search-input"
            value={textFilter}
            onChange={onChangeTextFilter}
          />
          <VisuallyHidden>
            <span aria-live="polite">
              {intl.formatMessage(
                { id: 'contentsNextNumberOfItems' },
                { count: items.length },
              )}
            </span>
          </VisuallyHidden>
          {/* <TooltipTrigger>
            <DialogTrigger>
              <Button className="react-aria-Button add">
                <AddIcon />
              </Button>
              <AddContentPopover path={path} addableTypes={addableTypes} />
            </DialogTrigger>
            <Tooltip className="react-aria-Tooltip tooltip" placement="bottom">
              Add content
            </Tooltip>
          </TooltipTrigger> */}
        </section>
        <section className="contents-table">
          <Table
            aria-label={intl.formatMessage(
              { id: 'contentsNextContentsOf' },
              { title },
            )}
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
                    <CollectionIcon />
                  </Button>
                  <Tooltip
                    className="react-aria-Tooltip tooltip"
                    placement="bottom"
                  >
                    {intl.formatMessage({ id: 'Rearrange items by…' })}
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
        </section>
      </article>
    </Container>
  );
}
