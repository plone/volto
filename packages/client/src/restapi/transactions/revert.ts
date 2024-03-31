import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { revertTransactionsDataSchema } from '../../validation/transactions';
import { RevertTransactionsResponse } from '@plone/types';

export const revertTransactionsArgsSchema = z.object({
  data: revertTransactionsDataSchema,
  config: PloneClientConfigSchema,
});

export type RevertTransactionsArgs = z.infer<
  typeof revertTransactionsArgsSchema
>;

export const revertTransactions = async ({
  data,
  config,
}: RevertTransactionsArgs): Promise<RevertTransactionsResponse> => {
  const validatedArgs = revertTransactionsArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('patch', '/@transactions', options);
};

export const revertTransactionsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'transactions'],
  mutationFn: ({ data }: Omit<RevertTransactionsArgs, 'config'>) =>
    revertTransactions({ data, config }),
});
