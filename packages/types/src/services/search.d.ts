import { Brain } from './common';

export interface GetSearchResponse {
  '@id': string;
  items: Brain[];
  items_total: number;
}
