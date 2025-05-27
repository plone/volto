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
export type { ObjectBrowserWidgetMode };

export { isImageMode, isMultipleMode, isLinkMode };
