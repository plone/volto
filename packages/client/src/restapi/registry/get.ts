import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getRegistryRecordSchema = z.object({
  registryName: z.string(),
});

export type GetRegistryArgs = z.infer<typeof getRegistryRecordSchema>;

export async function getRegistryRecord(
  this: PloneClient,
  { registryName }: GetRegistryArgs,
): Promise<RequestResponse<string>> {
  const validatedArgs = getRegistryRecordSchema.parse({
    registryName,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const registryPath = `/@registry/${validatedArgs.registryName}`;

  return apiRequest('get', registryPath, options);
}
