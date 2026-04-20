import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { User as GetUserResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getUserSchema = z.object({
  id: z.string(),
});

export type UserArgs = z.infer<typeof getUserSchema>;

export async function getUser(
  this: PloneClient,
  { id }: UserArgs,
): Promise<RequestResponse<GetUserResponse>> {
  const validatedArgs = getUserSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const userName = `@users/${validatedArgs.id}`;

  return apiRequest('get', userName, options);
}
