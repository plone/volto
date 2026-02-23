import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { resetPasswordWithTokenDataSchema } from '../../validation/users';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const resetPasswordWithTokenArgsSchema = z.object({
  userId: z.string(),
  data: resetPasswordWithTokenDataSchema,
});

export type ResetPasswordWithTokenUserArgs = z.infer<
  typeof resetPasswordWithTokenArgsSchema
>;

export async function resetPasswordWithToken(
  this: PloneClient,
  { userId, data }: ResetPasswordWithTokenUserArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = resetPasswordWithTokenArgsSchema.parse({
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
