import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import { deleteAliasesDataSchema } from '../../validation/aliases';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteAliasesArgsSchema = z.object({
  path: z.string(),
  data: deleteAliasesDataSchema,
});

type DeleteAliasesArgs = z.infer<typeof deleteAliasesArgsSchema>;

export async function deleteAliases(
  this: PloneClient,
  { path, data }: DeleteAliasesArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteAliasesArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const aliasesPath = `${validatedArgs.path}/@aliases`;

  return apiRequest('delete', aliasesPath, options);
}
