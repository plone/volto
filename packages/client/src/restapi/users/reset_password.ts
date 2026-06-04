import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const resetPasswordArgsSchema = z.object({
  id: z.string(),
});

export type ResetUserArgs = z.infer<typeof resetPasswordArgsSchema>;

export async function resetPassword(
  this: PloneClient,
  { id }: ResetUserArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = resetPasswordArgsSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const userName = `@users/${validatedArgs.id}/reset-password`;

  return apiRequest('post', userName, options);
}
