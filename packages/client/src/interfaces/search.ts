import { z } from 'zod';

export interface GetSearchResponse {
  '@id': string;
  items: any[];
  items_total: number;
}

export const querySchema = z
  .object({
    path: z
      .object({
        query: z.union([z.string(), z.array(z.string())]),
        depth: z.number().optional(),
      })
      .optional(),
    sort_on: z.union([z.string(), z.array(z.string())]).optional(),
    SearchableText: z.string().optional(),
    metadata_fields: z.union([z.string(), z.array(z.string())]).optional(),
    fullobjects: z.number().optional(),
  })
  .and(z.record(z.any()));

export const getSearchSchema = z.object({
  query: querySchema,
});
