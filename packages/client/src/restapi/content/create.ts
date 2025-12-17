import { z } from 'zod';
import type PloneClient from '../../client';
import { apiRequest, type ApiRequestParams } from '../../api';
import { createContentDataSchema } from '../../validation/content';
import type { CreateContentResponse } from '@plone/types';
import type { RequestResponse } from '../types';

export const createContentArgsSchema = z.object({
  path: z.string(),
  data: createContentDataSchema,
});

export type CreateContentArgs = z.infer<typeof createContentArgsSchema>;

export async function createContent(
  this: PloneClient,
  { path, data }: CreateContentArgs,
): Promise<RequestResponse<CreateContentResponse>> {
  const validatedArgs = createContentArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };
  return apiRequest('post', validatedArgs.path, options);
}
