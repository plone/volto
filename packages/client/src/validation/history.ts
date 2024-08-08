import { z } from 'zod';

export const revertHistoryDataSchema = z.object({
  version: z.number(),
});
