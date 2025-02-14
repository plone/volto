import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const resetPasswordArgsSchema = z.object({
  userId: z.string(),
  config: PloneClientConfigSchema,
});

export type ResetUserArgs = z.infer<typeof resetPasswordArgsSchema>;

export const resetPassword = async ({
  userId,
  config,
}: ResetUserArgs): Promise<undefined> => {
  const validatedArgs = resetPasswordArgsSchema.parse({
    userId,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const userName = `@users/${validatedArgs.userId}/reset-password`;

  return apiRequest('post', userName, options);
};

export const resetPasswordMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'user'],
  mutationFn: ({ userId }: Omit<ResetUserArgs, 'config'>) =>
    resetPassword({ userId, config }),
});
