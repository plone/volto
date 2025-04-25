import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteWorkingcopyArgsSchema = z.object({
  path: z.string(),
});

type DeleteWorkingcopyArgs = z.infer<typeof deleteWorkingcopyArgsSchema>;

export async function deleteWorkingcopy(
  this: PloneClient,
  { path }: DeleteWorkingcopyArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteWorkingcopyArgsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const deleteWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('delete', deleteWorkingcopyPath, options);
}
