import { z } from 'zod';

interface Transaction {
  description: string;
  id: string;
  size: number;
  time: string;
  username: string;
}

export interface GetTransactionsResponse extends Array<Transaction> {}

export const revertTransactionsDataSchema = z.object({
  transaction_ids: z.array(z.string()),
});

export interface RevertTransactionsResponse {
  message: string;
}
