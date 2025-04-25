import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import { z } from 'zod';
import { updateContentDataSchema } from '../../validation/content';
import type { UpdateContentResponse } from '@plone/types';
import type { RequestResponse } from '../types';

export const updateContentArgsSchema = z.object({
  path: z.string(),
  data: updateContentDataSchema,
});

export type UpdateContentArgs = z.infer<typeof updateContentArgsSchema>;

export async function updateContent(
  this: PloneClient,
  { path, data }: UpdateContentArgs,
): Promise<RequestResponse<UpdateContentResponse>> {
  const validatedArgs = updateContentArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };
  return apiRequest('patch', validatedArgs.path, options);
}
