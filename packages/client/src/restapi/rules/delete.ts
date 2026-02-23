import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import { deleteRulesDataSchema } from '../../validation/rules';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteRulesArgsSchema = z.object({
  data: deleteRulesDataSchema,
});

type DeleteRulesArgs = z.infer<typeof deleteRulesArgsSchema>;

export async function deleteRules(
  this: PloneClient,
  { data }: DeleteRulesArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteRulesArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const deleteRulesPath = `/@content-rules`;

  return apiRequest('delete', deleteRulesPath, options);
}
