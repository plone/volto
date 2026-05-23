import type { ContentBase } from '../base';

export interface CollectionContent extends ContentBase {
  '@type': 'Collection';
  query: Array<{
    i: string;
    o: string;
    v: string | string[];
  }>;
  sort_on: string;
  sort_reversed: boolean;
  limit: number;
  item_count: number;
  b_size: number;
}

declare module '../index' {
  interface ContentTypeMap {
    Collection: CollectionContent;
  }
}
