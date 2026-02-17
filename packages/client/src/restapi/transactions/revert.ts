import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { revertTransactionsDataSchema } from '../../validation/transactions';
import type { RevertTransactionsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const revertTransactionsArgsSchema = z.object({
  data: revertTransactionsDataSchema,
});

export type RevertTransactionsArgs = z.infer<
  typeof revertTransactionsArgsSchema
>;

export async function revertTransactions(
  this: PloneClient,
  { data }: RevertTransactionsArgs,
): Promise<RequestResponse<RevertTransactionsResponse>> {
  const validatedArgs = revertTransactionsArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('patch', '/@transactions', options);
}
