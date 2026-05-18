import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { updateUserDataSchema } from '../../validation/users';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateUserArgsSchema = z.object({
  id: z.string(),
  data: updateUserDataSchema,
});

export type UpdateUserArgs = z.infer<typeof updateUserArgsSchema>;

export async function updateUser(
  this: PloneClient,
  { id, data }: UpdateUserArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updateUserArgsSchema.parse({
    id,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const userName = `/@users/${validatedArgs.id}`;

  return apiRequest('patch', userName, options);
}
