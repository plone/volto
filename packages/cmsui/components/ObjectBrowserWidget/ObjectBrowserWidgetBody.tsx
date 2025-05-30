import {
  Breadcrumb,
  Breadcrumbs,
  Button,
  GridList,
  GridListItem,
} from '@plone/components/tailwind';
import React, { useEffect, useState } from 'react';
import { isImageMode, type ObjectBrowserWidgetMode } from './utils';
import {
  ArrowleftIcon,
  ChevronrightIcon,
  ListIcon,
} from '../../../components/src/components/icons';
import type { GridListProps, Key } from 'react-aria-components';
import type Field from '../Form/Field';
import { useObjectBrowserNavigation } from './ObjectBrowserNavigationContext';
import { useFetcher } from 'react-router';
import type { loader as searchLoader } from '../../routes/search';
import type { loader as breadcrumbsLoader } from '../../routes/breadcrumbs';
import type { Brain } from '@plone/types';

export interface ObjectBrowserWidgetBodyProps
  extends Pick<React.ComponentProps<typeof Breadcrumbs>, 'items'>,
    Omit<React.ComponentProps<typeof Field>, 'label'> {
  mode: ObjectBrowserWidgetMode;
  loading: boolean;
  items: Awaited<ReturnType<typeof searchLoader>>['data']['items'] | undefined;
  breadcrumbs:
    | Awaited<ReturnType<typeof breadcrumbsLoader>>['data']['items']
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
  console.log('caneee', breadcrumbs);
  const [viewMode, setViewMode] = useState<boolean>(false);
  const { navigateTo, goBack, canGoBack } = useObjectBrowserNavigation();
  const handleAction = (item: Brain) => {
    if (isImageMode(mode)) {
      console.log('aaaaaaaaa', item);
    }
  };
  return (
    <div className="items-between flex flex-col justify-center py-4">
      <div className="flex items-center justify-between space-y-1">
        <div className="flex items-center gap-2">
          {canGoBack && (
            <Button variant="neutral" onPress={goBack}>
              <ArrowleftIcon />
            </Button>
          )}
          <Breadcrumbs
            root={'/'}
            items={breadcrumbs}
            includeRoot
            homeIcon={null}
          >
            {(item) => (
              <Breadcrumb
                id={item['@id']}
                onPress={(e) => {
                  navigateTo(e.target.id);
                }}
              >
                {item.title}
              </Breadcrumb>
            )}
          </Breadcrumbs>
        </div>

        <Button
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
        items={items}
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
            // className="text-quanta-cobalt flex w-full items-center justify-between rounded-none!"
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
