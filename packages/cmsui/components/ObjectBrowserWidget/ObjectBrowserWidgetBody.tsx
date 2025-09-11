import {
  Breadcrumb,
  Breadcrumbs,
  Button,
  GridList,
  GridListItem,
} from '@plone/components/quanta';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { getItemLabel, isSelectable } from './utils';
import {
  ArrowleftIcon,
  ChevronrightIcon,
  ListIcon,
} from '@plone/components/Icons';
import type { PressEvent } from 'react-aria-components';
import { useObjectBrowserNavigation } from './ObjectBrowserNavigationContext';
import { flattenToAppURL } from '@plone/helpers';
import { useTranslation } from 'react-i18next';
import type { Brain } from '@plone/types';
import { useObjectBrowserContext } from './ObjectBrowserContext';

export function ObjectBrowserWidgetBody() {
  const [viewMode, setViewMode] = useState<boolean>(false);
  const { t } = useTranslation();
  const { currentPath, navigateTo, goBack, canGoBack } =
    useObjectBrowserNavigation();
  const {
    open,
    setOpen,
    searchMode,
    setSearchMode,
    handleSearchInputChange,
    title,
    loading,
    items,
    breadcrumbs,
    selectedItems,
    handleSelectionChange,
    mode,
    ...rest
  } = useObjectBrowserContext();
  const handleBreadcrumbNavigation = (e: PressEvent) => {
    navigateTo(e.target.id, 'replace');
  };

  const gridListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentPath && !loading && items?.length && gridListRef.current) {
      setTimeout(() => {
        const gridList = gridListRef.current?.querySelector('[role="row"]');
        if (gridList instanceof HTMLElement) {
          gridList.focus();
        }
      }, 400);
    }
  }, [currentPath, loading, items]);

  const handleNavigation = (item: Brain) => {
    navigateTo(item['@id']);
    setSearchMode(false);
  };

  const { widgetOptions } = rest;

  return (
    <div className="flex h-full w-full flex-col pt-4 pb-8">
      <div className="flex items-center justify-between space-y-1">
        <div className="flex items-center gap-3 text-sm">
          <>
            {/* TODO: check if we want this, all icons in this scope cause nasty layout shift */}
            {canGoBack && (
              <Button
                variant="neutral"
                onPress={goBack}
                type="button"
                aria-label={t('cmsui.objectbrowserwidget.goback')}
              >
                <ArrowleftIcon size="sm" />
              </Button>
            )}

            <Breadcrumbs
              root={{ '@id': '/', title: t('cmsui.objectbrowserwidget.home') }}
              items={breadcrumbs ?? []}
              // includeRoot
              homeIcon={null}
              className="flex-wrap"
            >
              {(item) => (
                <Breadcrumb
                  id={item['@id']}
                  onPress={handleBreadcrumbNavigation}
                >
                  {item.title}
                </Breadcrumb>
              )}
            </Breadcrumbs>
          </>
        </div>

        <Button
          type="button"
          onPress={() => {
            setViewMode(!viewMode);
          }}
          aria-label={t('cmsui.objectbrowserwidget.changeViewMode', {
            mode: t(
              `cmsui.objectbrowserwidget.viewModes.${viewMode ? 'list' : 'grid'}`,
            ),
          })}
        >
          <ListIcon size="sm" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-scroll" ref={gridListRef} tabIndex={-1}>
        <GridList
          aria-label={`${t('cmsui.objectbrowserwidget.routeannouncer', {
            route: [
              { title: t('cmsui.objectbrowserwidget.home') },
              ...breadcrumbs,
            ]
              .map((b) => b.title)
              .join('/'),
          })}
              ${t('cmsui.objectbrowserwidget.searchResults', {
                count: items?.length ?? 0,
              })}`}
          key={`${viewMode}-${currentPath}`} // Force re-render on viewMode or path change
          selectionMode={'multiple'}
          disabledBehavior="selection"
          escapeKeyBehavior="none"
          selectionBehavior={'toggle'}
          items={items ?? []}
          layout={viewMode ? 'grid' : 'stack'}
          className={
            viewMode
              ? 'group [&>div]:hover:bg-quanta-smoke/50 data-[layout="grid"] my-4 grid grid-cols-2 gap-4 border-0 p-4 [&_label[slot="selection"]]:hidden [&>div]:rounded-lg [&>div]:p-4 [&>div]:transition-all [&>div]:duration-200'
              : 'group [&>div]:border-b-quanta-silver data-[layout="stack"] my-4 flex flex-col divide-y divide-gray-200 rounded-none border-0 [&_img]:hidden [&>div]:h-12 [&>div]:rounded-none [&>div]:border-b-2 [&>div]:first:rounded-t-none [&>div]:last:rounded-b-none'
          }
          onSelectionChange={handleSelectionChange}
          selectedKeys={selectedItems}
          renderEmptyState={() =>
            loading
              ? t('cmsui.objectbrowserwidget.loading')
              : t('cmsui.objectbrowserwidget.noResults')
          }
        >
          {(item) => {
            const disabled = !isSelectable(item, {
              ...widgetOptions,
              mode,
              items: items || [],
            });
            const isSelected = selectedItems.includes(item['@id']);
            return (
              <GridListItem
                id={item['@id']}
                textValue={getItemLabel(t, item, isSelected, disabled)}
                // textValue={item.title}
                aria-label={getItemLabel(t, item, isSelected, disabled)}
                key={item['@id']}
                data-selectable={!disabled}
                isDisabled={disabled}
                className={
                  'group data-[selectable=false]:bg-quanta-silver data-[selectable=false]:text-iron data-[selectable=false]:cursor-not-allowed'
                }
              >
                {viewMode ? (
                  <div className="-mx-3 -my-2 flex h-full w-full flex-1 flex-col items-center gap-2">
                    <div
                      className={
                        'bg-quanta-snow flex min-h-36 min-w-36 flex-col items-center justify-center rounded-md text-center'
                      }
                    >
                      {item.image_field && item.image_scales ? (
                        // TODO: use Image component
                        <img
                          className="h-full w-full object-contain"
                          src={flattenToAppURL(
                            `${item['@id']}/${item.image_scales.image[0].scales.preview?.download}`,
                          )}
                          alt={item.title || ''}
                        />
                      ) : (
                        <div className="text-quanta-pigeon flex h-12 w-12 items-center justify-center rounded text-2xl">
                          📄
                        </div>
                      )}
                    </div>
                    <span className="text-quanta-cobalt text-sm leading-tight font-medium">
                      {item.title}
                    </span>
                  </div>
                ) : (
                  <div className="text-quanta-cobalt group-data-[selectable=false]:text-quanta-iron flex h-full w-full items-center justify-between rounded-none!">
                    {item.image_field && item.image_scales && (
                      // TODO: use Image component
                      <img
                        className="bg-snow h-full w-full"
                        alt={item.title}
                        src={flattenToAppURL(
                          `${item['@id']}/${item.image_scales.image[0].scales.preview?.download}`,
                        )}
                      />
                    )}
                    {item.title}
                    {item.is_folderish && (
                      <Button
                        variant="icon"
                        type="button"
                        aria-label={t(
                          'cmsui.objectbrowserwidget.itemNavigateTo',
                          { title: item.title },
                        )}
                        className={'rounded-none border-none bg-transparent'}
                        onPress={() => handleNavigation(item)}
                      >
                        <ChevronrightIcon size="sm" />
                      </Button>
                    )}
                  </div>
                )}
              </GridListItem>
            );
          }}
        </GridList>
      </div>
    </div>
  );
}

ObjectBrowserWidgetBody.displayName = 'ObjectBrowserWidgetBody';
