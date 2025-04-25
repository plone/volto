import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import { deleteLockDataSchema } from '../../validation/lock';
import type { LockInfo as DeleteLockResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteLockArgsSchema = z.object({
  path: z.string(),
  data: deleteLockDataSchema.optional(),
});

type DeleteLockArgs = z.infer<typeof deleteLockArgsSchema>;

export async function deleteLock(
  this: PloneClient,
  { path, data }: DeleteLockArgs,
): Promise<RequestResponse<DeleteLockResponse>> {
  const validatedArgs = deleteLockArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const deleteLockPath = `/${validatedArgs.path}/@lock`;

  return apiRequest('delete', deleteLockPath, options);
}
