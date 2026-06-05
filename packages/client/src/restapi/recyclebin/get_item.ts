import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import {
  recycleBinIdSchema,
  recycleBinQuerySchema,
} from '../../validation/recyclebin';
import type { GetRecycleBinItemResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const getRecycleBinItemArgsSchema = z.object({
  id: recycleBinIdSchema,
  query: recycleBinQuerySchema,
});

export type GetRecycleBinItemArgs = z.infer<typeof getRecycleBinItemArgsSchema>;

export async function getRecycleBinItem(
  this: PloneClient,
  { id, query = {} }: GetRecycleBinItemArgs,
): Promise<RequestResponse<GetRecycleBinItemResponse>> {
  const validatedArgs = getRecycleBinItemArgsSchema.parse({
    id,
    query,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: validatedArgs.query,
  };

  return apiRequest('get', `/@recyclebin/${validatedArgs.id}`, options);
}
