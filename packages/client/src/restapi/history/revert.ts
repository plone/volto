import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { revertHistoryDataSchema } from '../../validation/history';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const revertHistoryArgsSchema = z.object({
  path: z.string(),
  data: revertHistoryDataSchema,
});

export type ReverHistoryArgs = z.infer<typeof revertHistoryArgsSchema>;

export async function revertHistory(
  this: PloneClient,
  { path, data }: ReverHistoryArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = revertHistoryArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const historyPath = `${validatedArgs.path}/@history`;

  return apiRequest('patch', historyPath, options);
}
