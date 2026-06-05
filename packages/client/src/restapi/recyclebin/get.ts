import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { recycleBinQuerySchema } from '../../validation/recyclebin';
import type { GetRecycleBinResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const getRecycleBinArgsSchema = z.object({
  query: recycleBinQuerySchema,
});

export type GetRecycleBinArgs = z.infer<typeof getRecycleBinArgsSchema>;

export async function getRecycleBin(
  this: PloneClient,
  { query = {} }: GetRecycleBinArgs = { query: {} },
): Promise<RequestResponse<GetRecycleBinResponse>> {
  const validatedArgs = getRecycleBinArgsSchema.parse({
    query,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: validatedArgs.query,
  };

  return apiRequest('get', '/@recyclebin', options);
}
