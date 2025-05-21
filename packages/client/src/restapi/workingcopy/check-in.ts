import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const checkInWorkingcopyArgsSchema = z.object({
  path: z.string(),
});

export type CheckInWorkingcopyArgs = z.infer<
  typeof checkInWorkingcopyArgsSchema
>;

export async function checkInWorkingcopy(
  this: PloneClient,
  { path }: CheckInWorkingcopyArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = checkInWorkingcopyArgsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const checkInWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('patch', checkInWorkingcopyPath, options);
}
