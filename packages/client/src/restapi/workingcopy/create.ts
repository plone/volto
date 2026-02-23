import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type { CreateWorkingcopyResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createWorkingcopyArgsSchema = z.object({
  path: z.string(),
});

export type CreateWorkingcopyArgs = z.infer<typeof createWorkingcopyArgsSchema>;

export async function createWorkingcopy(
  this: PloneClient,
  { path }: CreateWorkingcopyArgs,
): Promise<RequestResponse<CreateWorkingcopyResponse>> {
  const validatedArgs = createWorkingcopyArgsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };
  const createWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('post', createWorkingcopyPath, options);
}
