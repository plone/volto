import {
  Breadcrumb,
  Breadcrumbs,
  Button,
  GridList,
  GridListItem,
} from '@plone/components/quanta';
import { useEffect, useState, useRef } from 'react';
import { isSelectable, getItemLabel } from './utils';
import { ArrowleftIcon, ListIcon } from '@plone/components/Icons';
import type { PressEvent } from 'react-aria-components';
import { useObjectBrowserNavigation } from './ObjectBrowserNavigationContext';
import { useTranslation } from 'react-i18next';
import type { Brain } from '@plone/types';
import { useObjectBrowserContext } from './ObjectBrowserContext';
import { ObjectBrowserItem, itemVariants } from './ObjectBrowserItem';

export function ObjectBrowserWidgetBody() {
  const [viewMode, setViewMode] = useState<boolean>(false);
  const { t } = useTranslation();
  const { currentPath, navigateTo, goBack, canGoBack } =
    useObjectBrowserNavigation();
  const {
    // open,
    // setOpen,
    searchMode,
    setSearchMode,
    SearchableText,
    // handleSearchInputChange,
    // title,
    loading,
    items,
    breadcrumbs,
    selectedItems,
    handleSelectionChange,
    mode,
    ariaControlsId,
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
        <div className="mb-0 flex items-center gap-3 text-sm">
          <>
            {/* TODO: check if we want this, all icons in this scope cause nasty layout shift */}
            {canGoBack && !searchMode && (
              <Button
                variant="neutral"
                onPress={goBack}
                type="button"
                aria-label={t('cmsui.objectbrowserwidget.goback')}
              >
                <ArrowleftIcon size="sm" />
              </Button>
            )}

            {!searchMode ? (
              <Breadcrumbs
                root={{
                  '@id': '/',
                  title: t('cmsui.objectbrowserwidget.home'),
                }}
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
            ) : (
              <span className="mt-1">
                {t('cmsui.objectbrowserwidget.searchResultsFor', {
                  searchTerm: SearchableText,
                  count: items?.length ?? 0,
                })}
              </span>
            )}
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

      <div
        className="contents flex-1 overflow-y-scroll"
        ref={gridListRef}
        tabIndex={-1}
      >
        <GridList
          id={ariaControlsId}
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
          // Todo: better styling
          className={
            viewMode
              ? `
                group data-[layout="grid"] grid h-fit grid-cols-2 gap-4 border-0 py-4
                [&_label[slot="selection"]]:hidden
                [&>div]:rounded-lg [&>div]:p-0 [&>div]:transition-all [&>div]:duration-200
              `
              : `
                group data-[layout="stack"] my-4 flex h-full flex-col divide-y divide-gray-200
                rounded-none border-0
                [&_img]:hidden
                [&>div]:h-12 [&>div]:rounded-none [&>div]:border-b-2 [&>div]:border-b-quanta-silver
                [&>div]:first:rounded-t-none [&>div]:last:rounded-b-none
              `
          }
          onSelectionChange={handleSelectionChange}
          selectedKeys={selectedItems}
          renderEmptyState={() =>
            loading ? (
              <div className="py-8 text-center italic">
                {t('cmsui.objectbrowserwidget.loading')}
              </div>
            ) : searchMode && !SearchableText ? (
              <div className="h-full w-full rounded-lg bg-quanta-silver"></div>
            ) : (
              <div className="py-8 text-center italic">
                {t('cmsui.objectbrowserwidget.noResults')}
              </div>
            )
          }
        >
          {(item) => {
            // Convert selectedItems IDs to actual Brain objects for isSelectable
            const selectedItemObjects = selectedItems
              .map((id) => items?.find((item) => item['@id'] === id))
              .filter(Boolean) as Brain[];

            const disabled = !isSelectable(item, {
              ...widgetOptions,
              mode,
              items: selectedItemObjects,
            });
            const isSelected = selectedItems.includes(item['@id']);
            const reviewState = item.review_state || undefined;

            return (
              <GridListItem
                id={item['@id']}
                textValue={getItemLabel(t, item, isSelected, disabled)}
                aria-label={getItemLabel(t, item, isSelected, disabled)}
                data-selectable={!disabled}
                onAction={() => handleNavigation(item)}
                isDisabled={disabled}
                className={itemVariants({
                  viewMode: viewMode ? 'grid' : 'list',
                  workflow: reviewState as any,
                })}
              >
                <ObjectBrowserItem
                  item={item}
                  viewMode={viewMode}
                  onNavigate={handleNavigation}
                />
              </GridListItem>
            );
          }}
        </GridList>
      </div>
    </div>
  );
}

ObjectBrowserWidgetBody.displayName = 'ObjectBrowserWidgetBody';
