import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { updateUserDataSchema } from '../../validation/users';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateUserArgsSchema = z.object({
  userId: z.string(),
  data: updateUserDataSchema,
});

export type UpdateUserArgs = z.infer<typeof updateUserArgsSchema>;

export async function updateUser(
  this: PloneClient,
  { userId, data }: UpdateUserArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updateUserArgsSchema.parse({
    userId,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const userName = `/@users/${validatedArgs.userId}`;

  return apiRequest('patch', userName, options);
}
