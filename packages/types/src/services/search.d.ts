import { Brain } from './common';

export interface SearchResponse {
  '@id': string;
  items: Brain[];
  items_total: number;
}
