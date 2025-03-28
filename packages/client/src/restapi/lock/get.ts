import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { LockInfo as GetLockResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getLockSchema = z.object({
  path: z.string(),
});

export type LockArgs = z.infer<typeof getLockSchema>;

export async function getLock(
  this: PloneClient,
  { path }: LockArgs,
): Promise<RequestResponse<GetLockResponse>> {
  const validatedArgs = getLockSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const getLockPath = `/${validatedArgs.path}/@lock`;

  return apiRequest('get', getLockPath, options);
}
