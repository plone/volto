import { flattenToAppURL } from '@plone/helpers';
import { useEffect, useRef, useState } from 'react';
import type { Fetcher } from 'react-router';

type ObjectBrowserWidgetMode = 'multiple' | 'link' | 'image';
// TODO: complete logic with real backend
function isLinkMode(obj: ObjectBrowserWidgetMode): obj is 'link' {
  return obj === 'link';
}
function isImageMode(obj: ObjectBrowserWidgetMode): obj is 'image' {
  return obj === 'image';
}
function isMultipleMode(obj: ObjectBrowserWidgetMode): obj is 'multiple' {
  return obj === 'multiple';
}

// TODO: complete logic with real backend
const isSelectable = (item: any, options: Record<string, any>) => {
  const { maximumSelectionSize, items, mode, selectableTypes } = options;
  if (
    maximumSelectionSize &&
    items &&
    mode === 'multiple' &&
    maximumSelectionSize <= items.length
  )
    // The item should actually be selectable, but only for removing it from already selected items list.
    // handleClickOnItem will handle the deselection logic.
    // The item is not selectable if we reached/exceeded maximumSelectionSize and is not already selected.
    return items.some(
      (i: any) => flattenToAppURL(i['@id']) === flattenToAppURL(item['@id']),
    );
  return selectableTypes.length > 0
    ? selectableTypes.indexOf(item['@type']) >= 0
    : true;
};

// Minimize flickering and/or lag while waiting for loader
// TODO: see if there is a better way to minimize flickering/lag
function useStableFetcherData<T>(fetcher: Fetcher<T>) {
  const previousDataRef = useRef<T | undefined>(fetcher.data);
  const [stableData, setStableData] = useState<T | undefined>(fetcher.data);

  useEffect(() => {
    // If fetcher is idle, update stable data to the new data
    // Else: keep stableData as is (the previous data)
    if (fetcher.state === 'idle' && fetcher.data !== undefined) {
      previousDataRef.current = fetcher.data;
      setStableData(fetcher.data);
    }
  }, [fetcher.data, fetcher.state]);

  return stableData;
}

export type { ObjectBrowserWidgetMode };

export { isImageMode, isMultipleMode, isLinkMode, useStableFetcherData };
