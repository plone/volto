import { z } from 'zod';

export interface GetAliasesResponse {
  '@id': string;
  items: Array<{
    path: string;
  }>;
  items_total: number;
}

export interface GetAliasesListResponse {
  '@id': string;
  items: Array<{
    datetime: string;
    manual: boolean;
    path: string;
    'redirect-to': string;
  }>;
  items_total: number;
}

const itemSchema = z.object({
  path: z.string(),
});

export const createAliasesDataSchema = z.object({
  items: z.array(itemSchema),
});

export const deleteAliasesDataSchema = z.object({
  items: z.array(itemSchema),
});

const rootItemSchema = z.object({
  datetime: z.string().optional(),
  path: z.string(),
  'redirect-to': z.string(),
});

export const createAliasesMultipleDataSchema = z.object({
  items: z.array(rootItemSchema),
});
