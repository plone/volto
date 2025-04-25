import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteUserArgsSchema = z.object({
  userId: z.string(),
});

type DeleteUserArgs = z.infer<typeof deleteUserArgsSchema>;

export async function deleteUser(
  this: PloneClient,
  { userId }: DeleteUserArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteUserArgsSchema.parse({
    userId,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const userName = `/@users/${validatedArgs.userId}`;

  return apiRequest('delete', userName, options);
}
