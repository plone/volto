import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { createTypeFieldDataSchema } from '../../validation/types';
import type { CreateTypeFieldResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createTypeFieldArgsSchema = z.object({
  contentPath: z.string(),
  data: createTypeFieldDataSchema,
});

export type CreateTypeFieldArgs = z.infer<typeof createTypeFieldArgsSchema>;

export async function createTypeField(
  this: PloneClient,
  { contentPath, data }: CreateTypeFieldArgs,
): Promise<RequestResponse<CreateTypeFieldResponse>> {
  const validatedArgs = createTypeFieldArgsSchema.parse({
    contentPath,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };
  const addTypeFieldPath = `/@types/${validatedArgs.contentPath}`;

  return apiRequest('post', addTypeFieldPath, options);
}
