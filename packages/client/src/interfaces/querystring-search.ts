import { z } from 'zod';

export interface QuerystringSearchResponse {
  '@id': string;
  items: Item[];
  items_total: number;
}

interface Item {
  '@id': string;
  '@type': string;
  description: string;
  review_state: string;
  title: string;
  type_title: string;
}

const query = z.object({
  i: z.string(),
  o: z.string(),
  v: z.array(z.string()),
});

export const querystringSearchDataSchema = z.object({
  b_start: z.string().optional(),
  b_size: z.string().optional(),
  limit: z.string().optional(),
  sort_on: z.string().optional(),
  sort_order: z.string().optional(),
  fullobjects: z.boolean().optional(),
  query: z.array(query),
});
