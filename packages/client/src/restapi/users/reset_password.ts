import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const resetPasswordArgsSchema = z.object({
  userId: z.string(),
});

export type ResetUserArgs = z.infer<typeof resetPasswordArgsSchema>;

export async function resetPassword(
  this: PloneClient,
  { userId }: ResetUserArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = resetPasswordArgsSchema.parse({
    userId,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const userName = `@users/${validatedArgs.userId}/reset-password`;

  return apiRequest('post', userName, options);
}
