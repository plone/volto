import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { createAliasDataSchema } from '../../validation/aliases';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createAliasArgsSchema = z.object({
  path: z.string(),
  data: createAliasDataSchema,
});

export type CreateAliasArgs = z.infer<typeof createAliasArgsSchema>;

export async function createAlias(
  this: PloneClient,
  { path, data }: CreateAliasArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = createAliasArgsSchema.parse({
    path,
    data,
  });

  const addAliasPath = `${validatedArgs.path}/@aliases`;

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };
  return apiRequest('post', addAliasPath, options);
}
