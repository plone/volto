import type { Brain, Content } from '@plone/types';
import { useEffect, useState } from 'react';
import type { Fetcher } from 'react-router';
import type { Selection } from 'react-aria-components';
import type { UseTranslationResponse } from 'react-i18next';
import {
  PageIcon,
  FolderIcon,
  NewsIcon,
  CalendarIcon,
  ImageIcon,
  AttachmentIcon,
  LinkIcon,
  VideoIcon,
  CollectionIcon,
} from '@plone/components/Icons';

export interface ContentIconMap {
  [key: string]: React.ComponentType<any>;
}

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
function isAll(keys: unknown): keys is 'all' {
  return typeof keys === 'string' && keys === 'all';
}
const DEFAULT_DEPTH = 'path.depth=1';
const DEFAULT_METADATA_FIELDS = 'metadata_fields:list=is_folderish';

// Can be enhanched to support more query parameters if needed
// Like a widget that sets selectable portal_types can add that filter to this query
function buildObjectBrowserUrl(
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

function processSelection(keys: Selection, items: Brain[]): Brain[] {
  if (isAll(keys)) {
    return items;
  } else if (Array.isArray(keys)) {
    return items.filter((item) => keys.includes(item['@id']));
  } else if (keys instanceof Set) {
    return items.filter((item) => keys.has(item['@id']));
  }
  return [];
}

function initializeSelectedKeys(
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

  // First check: item type must be selectable
  if (
    selectableTypes &&
    selectableTypes.length > 0 &&
    !selectableTypes.includes(item['@type'])
  ) {
    return false;
  }

  // Second check: respect maximum selection limit
  if (maximumSelectionSize && items && maximumSelectionSize <= items.length) {
    // At limit: only already selected items are selectable (for deselection)
    return items.some((i) => i['@id'] === item['@id']);
  }

  // All checks passed
  return true;
};

/**
 * Default content type to icon mapping using Quanta icons
 */
const defaultContentIcons: ContentIconMap = {
  Document: PageIcon,
  Folder: FolderIcon,
  'News Item': NewsIcon,
  Event: CalendarIcon,
  Image: ImageIcon,
  File: AttachmentIcon,
  Link: LinkIcon,
  Video: VideoIcon,
  Collection: CollectionIcon,
};

/**
 * Get content icon component for a given content type
 * @function getContentIcon
 * @param {string} type Content type (e.g., 'Document', 'Folder', 'Image')
 * @param {boolean} isFolderish Whether the content is folderish
 * @param {ContentIconMap} customIcons Optional custom icon mapping to override defaults
 * @returns {React.ComponentType} Icon component from Quanta design system
 */
function getContentIcon(
  type: string,
  isFolderish: boolean = false,
  customIcons: ContentIconMap = {},
): React.ComponentType<any> {
  // Merge custom icons with defaults
  const contentIcons = { ...defaultContentIcons, ...customIcons };

  // Return specific icon for the content type if it exists
  if (type in contentIcons) {
    return contentIcons[type];
  }

  // Fallback to folder or file icon based on folderish property
  return isFolderish ? contentIcons.Folder : contentIcons.File;
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

const getItemLabel = (
  t: UseTranslationResponse<'translation', undefined>['t'],
  item: Brain,
  isSelected: boolean,
  disabled: boolean,
) => {
  const parts: string[] = [];

  // Always include the title
  parts.push(item.title);
  if (disabled) {
    parts.push(t('cmsui.objectbrowserwidget.itemNotSelectable')); // e.g., "not selectable"
  }
  // Selection state
  if (isSelected) {
    parts.push(t('cmsui.objectbrowserwidget.selected')); // e.g., "selected"
  }

  // Folderish / navigable
  if (item.is_folderish) {
    parts.push(t('cmsui.objectbrowserwidget.canNavigateTo')); // e.g., "can be navigated into"
  }

  // Workflow state
  if (item.review_state) {
    parts.push(
      t(`cmsui.objectbrowserwidget.workflowStates.${item.review_state}`),
    ); // e.g., "published"
  }

  // Join with commas or spaces
  return parts.join(', ');
};

export {
  isAll,
  isMultipleMode,
  isSingleMode,
  isSelectable,
  useAccumulatedItems,
  getItemLabel,
  buildObjectBrowserUrl,
  processSelection,
  initializeSelectedKeys,
  getContentIcon,
};
