import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetWorkingcopyResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getWorkingcopySchema = z.object({
  path: z.string(),
});

export type GetWorkingcopyArgs = z.infer<typeof getWorkingcopySchema>;

export async function getWorkingcopy(
  this: PloneClient,
  { path }: GetWorkingcopyArgs,
): Promise<RequestResponse<GetWorkingcopyResponse>> {
  const validatedArgs = getWorkingcopySchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const workingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('get', workingcopyPath, options);
}
