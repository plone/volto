import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { createLockDataSchema } from '../../validation/lock';
import type { CreateLockResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createLockArgsSchema = z.object({
  path: z.string(),
  data: createLockDataSchema,
});

export type CreateLockArgs = z.infer<typeof createLockArgsSchema>;

export async function createLock(
  this: PloneClient,
  { path, data }: CreateLockArgs,
): Promise<RequestResponse<CreateLockResponse>> {
  const validatedArgs = createLockArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };
  const addLockPath = `/${validatedArgs.path}/@lock`;

  return apiRequest('post', addLockPath, options);
}
