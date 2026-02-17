import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { createUserDataSchema } from '../../validation/users';
import type { User as CreateUserResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createUserArgsSchema = z.object({
  data: createUserDataSchema,
});

export type CreateUserArgs = z.infer<typeof createUserArgsSchema>;

export async function createUser(
  this: PloneClient,
  { data }: CreateUserArgs,
): Promise<RequestResponse<CreateUserResponse>> {
  const validatedArgs = createUserArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('post', '/@users', options);
}
