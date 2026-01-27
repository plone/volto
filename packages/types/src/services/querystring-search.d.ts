import { Brain } from './common';

export interface QuerystringSearchResponse {
  '@id': string;
  items: Brain[];
  items_total: number;
}
