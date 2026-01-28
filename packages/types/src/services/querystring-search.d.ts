import { Brain } from './common';

export interface QuerystringSearchResponse {
  '@id': string;
  items: Brain[];
  items_total: number;
}

export interface Query {
  i: string;
  o: string;
  v: string | string[];
}

export interface QuerystringParameter {
  b_start?: string;
  b_size?: string;
  limit?: string;
  sort_on?: string;
  sort_order?: string;
  fullobjects?: boolean;
  query: Query[];
  post?: boolean;
}
