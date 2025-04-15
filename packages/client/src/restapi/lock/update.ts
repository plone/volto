import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateLockArgsSchema = z.object({
  path: z.string(),
  locktoken: z.string(),
});

export type UpdateLockArgs = z.infer<typeof updateLockArgsSchema>;

export async function updateLock(
  this: PloneClient,
  { path, locktoken }: UpdateLockArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updateLockArgsSchema.parse({
    path,
    locktoken,
  });

  const options: ApiRequestParams = {
    headers: {
      'Lock-Token': validatedArgs.locktoken,
    },
    config: this.config,
  };
  return apiRequest('patch', validatedArgs.path, options);
}
