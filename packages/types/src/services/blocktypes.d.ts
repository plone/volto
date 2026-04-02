import type { ObjectBrowserItem } from '../blocks/objectBrowser';

export interface BlockTypeItem
  extends Pick<ObjectBrowserItem, '@id' | 'title'> {
  count: number;
}

export interface GetBlockTypeResponse extends Array<BlockTypeItem> {}
