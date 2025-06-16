import {
  Breadcrumb,
  Breadcrumbs,
  Button,
  GridList,
  GridListItem,
} from '@plone/components/tailwind';
import React, { useState } from 'react';
import { isImageMode, type ObjectBrowserWidgetMode } from './utils';
import {
  ChevronrightIcon,
  ListIcon,
} from '../../../components/src/components/icons';
import type { Key, PressEvent } from 'react-aria-components';
import type Field from '../Form/Field';
import { useObjectBrowserNavigation } from './ObjectBrowserNavigationContext';
import type { loader } from '../../routes/objectBrowserWidget';
import type { Brain } from '@plone/types';

export interface ObjectBrowserWidgetBodyProps
  extends Pick<React.ComponentProps<typeof Breadcrumbs>, 'items'>,
    Omit<React.ComponentProps<typeof Field>, 'label'> {
  mode: ObjectBrowserWidgetMode;
  loading: boolean;
  items:
    | Awaited<ReturnType<typeof loader>>['data']['results']['items']
    | undefined;
  breadcrumbs:
    | Awaited<ReturnType<typeof loader>>['data']['breadcrumbs']['items']
    | undefined;
  selectedItems: 'all' | Iterable<Key> | undefined;
  selectionMode: React.ComponentProps<typeof GridList>['selectionMode'];
  selectionBehavior: React.ComponentProps<typeof GridList>['selectionBehavior'];
  onChange: (value: any) => void;
}

export function ObjectBrowserWidgetBody({
  mode = 'image',
  items,
  breadcrumbs,
  loading,
  selectedItems = [],
  onChange,
  selectionBehavior,
  selectionMode,
  ...rest
}: ObjectBrowserWidgetBodyProps) {
  const [viewMode, setViewMode] = useState<boolean>(false);
  const { navigateTo, goBack, canGoBack } = useObjectBrowserNavigation();
  const handleAction = (item: Brain) => {
    if (isImageMode(mode)) {
      // TODO
      // eslint-disable-next-line no-console
      console.log('Image mode');
    }
  };
  const handleBreadcrumbNavigation = (e: PressEvent) => {
    navigateTo(e.target.id, 'replace');
  };
  return (
    <div className="items-between flex flex-col justify-center py-4">
      <div className="flex items-center justify-between space-y-1">
        <div className="flex items-center gap-2">
          {/* TODO: check if we want this, all icons in this scope cause nasty layout shift */}
          {/* {canGoBack && (
            <Button variant="neutral" onPress={goBack} type="button">
              <ArrowleftIcon />
            </Button>
          )} */}
          <Breadcrumbs
            root={'/'}
            items={breadcrumbs ?? []}
            includeRoot
            homeIcon={null}
          >
            {(item) => (
              <Breadcrumb id={item['@id']} onPress={handleBreadcrumbNavigation}>
                {item.title}
              </Breadcrumb>
            )}
          </Breadcrumbs>
        </div>

        <Button
          type="button"
          onPress={() => {
            setViewMode(!viewMode);
          }}
        >
          <ListIcon />
        </Button>
      </div>
      <GridList
        aria-label="no"
        selectionMode={selectionMode}
        selectionBehavior={viewMode ? 'replace' : 'toggle'}
        items={items ?? []}
        layout={viewMode ? 'grid' : 'stack'}
        className={
          viewMode
            ? 'group [data-layout="grid"] grid grid-cols-2 gap-4 p-4 [&_button]:hidden [&_div:has(img)]:flex-col [&>div]:h-[144px] [&>div]:w-[144px]'
            : 'group [&>div]:border-b-quanta-silver [data-layout="stack"] flex flex-col divide-y divide-gray-200 rounded-none border-0 py-4 [&_img]:hidden [&>div]:h-12 [&>div]:rounded-none [&>div]:border-b-2 [&>div]:first:rounded-t-none [&>div]:last:rounded-b-none'
        }
        onSelectionChange={onChange}
        selectedKeys={selectedItems}
      >
        {(item) => (
          <GridListItem
            id={item['@id']}
            textValue={item.Title}
            onAction={() => handleAction(item)}
          >
            <div
              className="text-quanta-cobalt flex h-full w-full items-center justify-between rounded-none!"
              data-element="content"
            >
              {item.image_field && item.image_scales && (
                <img className="h-full w-full bg-gray-400" alt=""></img>
              )}
              {item.title}
              {item.is_folderish && (
                <Button
                  variant="neutral"
                  type="button"
                  onPress={() => {
                    navigateTo(item['@id']);
                  }}
                >
                  <ChevronrightIcon />
                </Button>
              )}
            </div>
          </GridListItem>
        )}
      </GridList>
    </div>
  );
}
