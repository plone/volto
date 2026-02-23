import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { createRelationsDataSchema } from '../../validation/relations';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createRelationsArgsSchema = z.object({
  data: createRelationsDataSchema,
});

export type CreateRelationsArgs = z.infer<typeof createRelationsArgsSchema>;

export async function createRelations(
  this: PloneClient,
  { data }: CreateRelationsArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = createRelationsArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('post', '/@relations', options);
}
