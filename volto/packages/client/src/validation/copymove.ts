import { z } from 'zod';

export const copyMoveDataSchema = z.object({
  path: z.string(),
  data: z.object({
    source: z.union([z.string(), z.array(z.string())]),
  }),
});
