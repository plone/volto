import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { updateRegistryDataSchema } from '../../validation/registry';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateRegistryArgsSchema = z.object({
  data: updateRegistryDataSchema,
});

export type UpdateRegistryArgs = z.infer<typeof updateRegistryArgsSchema>;

export async function updateRegistry(
  this: PloneClient,
  { data }: UpdateRegistryArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updateRegistryArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('patch', '/@registry', options);
}
