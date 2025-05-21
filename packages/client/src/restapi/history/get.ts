import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetHistoryResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getHistorySchema = z.object({
  path: z.string(),
});

export type HistoryArgs = z.infer<typeof getHistorySchema> & {};

export async function getHistory(
  this: PloneClient,
  { path }: HistoryArgs,
): Promise<RequestResponse<GetHistoryResponse>> {
  const validatedArgs = getHistorySchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const historyPath = `/${validatedArgs.path}/@history`;

  return apiRequest('get', historyPath, options);
}
