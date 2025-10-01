import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetTypeResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getTypeSchema = z.object({
  contentType: z.string(),
});

export type GetTypeArgs = z.infer<typeof getTypeSchema>;

export async function getType(
  this: PloneClient,
  { contentType }: GetTypeArgs,
): Promise<RequestResponse<GetTypeResponse>> {
  const validatedArgs = getTypeSchema.parse({
    contentType,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const contentPathPath = `/@types/${validatedArgs.contentType}`;

  return apiRequest('get', contentPathPath, options);
}
