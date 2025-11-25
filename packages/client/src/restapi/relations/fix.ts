import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { fixRelationsDataSchema } from '../../validation/relations';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const fixRelationsArgsSchema = z.object({
  data: fixRelationsDataSchema.optional(),
});

export type FixRelationsArgs = z.infer<typeof fixRelationsArgsSchema>;

export async function fixRelations(
  this: PloneClient,
  { data }: FixRelationsArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = fixRelationsArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('post', '@relations/rebuild', options);
}
