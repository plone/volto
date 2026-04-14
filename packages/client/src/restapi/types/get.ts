import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetTypeResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getTypeSchema = z.object({
  type: z.string(),
});

export type GetTypeArgs = z.infer<typeof getTypeSchema>;

export async function getType(
  this: PloneClient,
  { type }: GetTypeArgs,
): Promise<RequestResponse<GetTypeResponse>> {
  const validatedArgs = getTypeSchema.parse({
    type,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const contentPathPath = `/@types/${validatedArgs.type}`;

  return apiRequest('get', contentPathPath, options);
}
