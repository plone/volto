import { Brain } from './common';
import { Batching } from './registry';

export interface QuerystringSearchResponse {
  '@id': string;
  items: Brain[];
  items_total: number;
  batching?: Batching;
}
