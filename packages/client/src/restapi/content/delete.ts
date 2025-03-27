import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteContentArgsSchema = z.object({
  path: z.string(),
});

type DeleteContentArgs = z.infer<typeof deleteContentArgsSchema>;

export async function deleteContent(
  this: PloneClient,
  { path }: DeleteContentArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteContentArgsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };
  return apiRequest('delete', validatedArgs.path, options);
}
