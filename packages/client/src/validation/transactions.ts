import { z } from 'zod';

export const revertTransactionsDataSchema = z.object({
  transaction_ids: z.array(z.string()),
});
