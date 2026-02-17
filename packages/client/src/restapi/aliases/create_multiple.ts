import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { createAliasesDataSchema } from '../../validation/aliases';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createAliasesArgsSchema = z.object({
  data: createAliasesDataSchema,
});

export type CreateAliasesArgs = z.infer<typeof createAliasesArgsSchema>;

export async function createAliases(
  this: PloneClient,
  { data }: CreateAliasesArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = createAliasesArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('post', '/@aliases', options);
}
