import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { updateTypeFieldDataSchema } from '../../validation/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateTypeFieldArgsSchema = z.object({
  contentPath: z.string(),
  data: updateTypeFieldDataSchema,
});

export type UpdateTypeFieldArgs = z.infer<typeof updateTypeFieldArgsSchema>;

export async function updateTypeField(
  this: PloneClient,
  { contentPath, data }: UpdateTypeFieldArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updateTypeFieldArgsSchema.parse({
    contentPath,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const updateTypeFieldPath = `/@types/${validatedArgs.contentPath}`;

  return apiRequest('patch', updateTypeFieldPath, options);
}
