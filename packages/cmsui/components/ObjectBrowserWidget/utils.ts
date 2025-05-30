import { flattenToAppURL } from '@plone/helpers';
import config from '@plone/registry';

type ObjectBrowserWidgetMode = 'multiple' | 'link' | 'image';
function isLinkMode(obj: ObjectBrowserWidgetMode): obj is 'link' {
  return obj === 'link';
}
function isImageMode(obj: ObjectBrowserWidgetMode): obj is 'image' {
  return obj === 'image';
}
function isMultipleMode(obj: ObjectBrowserWidgetMode): obj is 'multiple' {
  return obj === 'multiple';
}

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
      (i: any) =>
        flattenToAppURL(i['@id'], config.settings.apiPath) ===
        flattenToAppURL(item['@id'], config.settings.apiPath),
    );
  return selectableTypes.length > 0
    ? selectableTypes.indexOf(item['@type']) >= 0
    : true;
};
export type { ObjectBrowserWidgetMode };

export { isImageMode, isMultipleMode, isLinkMode };
