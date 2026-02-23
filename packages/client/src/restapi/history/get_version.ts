import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getHistoryVersionSchema = z.object({
  path: z.string(),
  version: z.number(),
});

export type HistoryVersionArgs = z.infer<typeof getHistoryVersionSchema>;

export async function getHistoryVersion(
  this: PloneClient,
  { path, version }: HistoryVersionArgs,
): Promise<RequestResponse<unknown>> {
  const validatedArgs = getHistoryVersionSchema.parse({
    path,
    version,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const historyPath = `${validatedArgs.path}/@history/${validatedArgs.version}`;

  return apiRequest('get', historyPath, options);
}
