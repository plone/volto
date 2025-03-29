import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { updatePasswordDataSchema } from '../../validation/users';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updatePasswordArgsSchema = z.object({
  userId: z.string(),
  data: updatePasswordDataSchema,
});

export type UpdatePasswordArgs = z.infer<typeof updatePasswordArgsSchema>;

export async function updatePassword(
  this: PloneClient,
  { userId, data }: UpdatePasswordArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updatePasswordArgsSchema.parse({
    userId,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const userName = `@users/${validatedArgs.userId}/reset-password`;

  return apiRequest('post', userName, options);
}
