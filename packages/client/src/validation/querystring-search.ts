import { z } from 'zod';

const query = z.object({
  i: z.string(),
  o: z.string(),
  v: z.union([z.string(), z.array(z.string())]),
});

export const querystringSearchDataSchema = z.object({
  b_start: z.string().optional(),
  b_size: z.string().optional(),
  limit: z.string().optional(),
  sort_on: z.string().optional(),
  sort_order: z.string().optional(),
  fullobjects: z.boolean().optional(),
  query: z.array(query),
  path: z.string().optional(),
});
