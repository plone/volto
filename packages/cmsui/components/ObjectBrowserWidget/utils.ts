import type { Brain, Content } from '@plone/types';
import { useEffect, useState } from 'react';
import type { Fetcher } from 'react-router';
import type { Selection } from 'react-aria-components';

export type ObjectBrowserWidgetMode = 'multiple' | 'single';
export type PartialBrainWithRequired = Partial<Brain> & {
  '@id': string;
  '@type': string;
  title: string;
};
export type WidgetPatternOptions = {
  pattern_options?: {
    maximumSelectionSize?: number;
    selectableTypes?: Content['@type'][];
    [key: string]: any;
  };
  items: PartialBrainWithRequired[];
  mode: ObjectBrowserWidgetMode;
};

function isSingleMode(obj: ObjectBrowserWidgetMode): obj is 'single' {
  return obj === 'single';
}
function isMultipleMode(obj: ObjectBrowserWidgetMode): obj is 'multiple' {
  return obj === 'multiple';
}
export function isAll(keys: unknown): keys is 'all' {
  return typeof keys === 'string' && keys === 'all';
}
const DEFAULT_DEPTH = 'path.depth=1';
const DEFAULT_METADATA_FIELDS = 'metadata_fields:list=is_folderish';

// Can be enhanched to support more query parameters if needed
// Like a widget that sets selectable portal_types can add that filter to this query
export function buildObjectBrowserUrl(
  currentPath?: string,
  searchText?: string,
  widgetOptions?: WidgetPatternOptions,
): string | null {
  if (!currentPath && !searchText) return null;

  if (searchText) {
    const searchParam = `&SearchableText=${encodeURIComponent(searchText)}`;
    return `/@objectBrowserWidget?${DEFAULT_METADATA_FIELDS}${searchParam}`;
  }

  return `/@objectBrowserWidget${currentPath}?${DEFAULT_DEPTH}&${DEFAULT_METADATA_FIELDS}`;
}

export function processSelection(keys: Selection, items: Brain[]): Brain[] {
  if (isAll(keys)) {
    return items;
  } else if (Array.isArray(keys)) {
    return items.filter((item) => keys.includes(item['@id']));
  } else if (keys instanceof Set) {
    return items.filter((item) => keys.has(item['@id']));
  }
  return [];
}

export function initializeSelectedKeys(
  defaultValue?: Brain[] | any,
): Set<{ id: string; title: string }> {
  // Handle case where defaultValue is not an array (like 'all' or other invalid values)
  if (!Array.isArray(defaultValue) || !defaultValue?.length) {
    return new Set();
  }

  return new Set(
    defaultValue.map((item: any) =>
      typeof item === 'string'
        ? { id: item, title: '' }
        : { id: item['@id'], title: item.title ?? '' },
    ),
  );
}

const isSelectable = (
  item: PartialBrainWithRequired,
  options: WidgetPatternOptions,
) => {
  const { pattern_options, items, mode } = options;
  const { maximumSelectionSize, selectableTypes } = pattern_options || {
    maximumSelectionSize: undefined,
    selectableTypes: [],
  };
  if (selectableTypes && !selectableTypes?.includes(item['@type']))
    return false;
  else if (selectableTypes && selectableTypes?.includes(item['@type'])) {
    if (
      maximumSelectionSize &&
      items &&
      mode === 'multiple' &&
      maximumSelectionSize <= items.length
    )
      // The item should actually be selectable, but only for removing it from already selected items list.
      // handleClickOnItem will handle the deselection logic.
      // The item is not selectable if we reached/exceeded maximumSelectionSize and is not already selected.
      return items.some((i) => i['@id'] === item['@id']);
    return true;
  }
  return true;
};

// Handle single vs multiple return values
function normalizeReturnValue(
  items: Array<{ id: string; title: string }>,
  returnType: 'single' | 'multiple' = 'multiple',
) {
  if (returnType === 'single') {
    // TODO: return only the first item (or null if empty)
    return items.length > 0 ? items[0] : null;
  }
  return items;
}

/**
 * @param dataKey - The key in the fetcher data object that contains the array of items to accumulate.
 * Expected values are typically 'items' or a property name containing an array of items.
 */
function mergeItems<T extends Brain>(prev: T[], newItems: T[]): T[] {
  const idSet = new Set<string>(prev.map((item) => item['@id']));
  return [...prev, ...newItems.filter((item) => !idSet.has(item['@id']))];
}

/**
 * @param dataKey - The key in the fetcher data object that contains the array of items to accumulate.
 * Expected values are typically 'items' or a property name containing an array of items.
 */
function useAccumulatedItems<T extends Brain = Brain>(
  fetcher: Fetcher<any>,
  dataKey: string,
) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    let newItems: T[] = [];
    const dataObj = fetcher.data as Record<string, any> | undefined;
    if (dataObj && dataObj[dataKey]) {
      if (Array.isArray(dataObj[dataKey])) {
        newItems = dataObj[dataKey];
      } else if (Array.isArray(dataObj[dataKey].items)) {
        newItems = dataObj[dataKey].items;
      }
    }
    if (newItems.length > 0) {
      setItems((prev) => mergeItems(prev, newItems));
    }
  }, [fetcher.data, fetcher.state, dataKey]);

  return items;
}

export { isMultipleMode, isSingleMode, isSelectable, useAccumulatedItems };
