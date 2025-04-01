import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetTypeFieldResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getTypeFieldSchema = z.object({
  contentFieldPath: z.string(),
});

export type GetTypeFieldArgs = z.infer<typeof getTypeFieldSchema> & {};

export async function getTypeField(
  this: PloneClient,
  { contentFieldPath }: GetTypeFieldArgs,
): Promise<RequestResponse<GetTypeFieldResponse>> {
  const validatedArgs = getTypeFieldSchema.parse({
    contentFieldPath,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const contentFieldPathPath = `/@types/${validatedArgs.contentFieldPath}`;

  return apiRequest('get', contentFieldPathPath, options);
}
