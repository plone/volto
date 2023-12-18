import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { resetPasswordWithTokenDataSchema } from '../../validation/users';

export const resetPasswordWithTokenArgsSchema = z.object({
  userId: z.string(),
  data: resetPasswordWithTokenDataSchema,
  config: PloneClientConfigSchema,
});

export type ResetPasswordWithTokenUserArgs = z.infer<
  typeof resetPasswordWithTokenArgsSchema
>;

export const resetPasswordWithToken = async ({
  userId,
  data,
  config,
}: ResetPasswordWithTokenUserArgs): Promise<undefined> => {
  const validatedArgs = resetPasswordWithTokenArgsSchema.parse({
    userId,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const userName = `@users/${validatedArgs.userId}/reset-password`;

  return apiRequest('post', userName, options);
};

export const resetPasswordWithTokenMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'user'],
  mutationFn: ({
    userId,
    data,
  }: Omit<ResetPasswordWithTokenUserArgs, 'config'>) =>
    resetPasswordWithToken({ userId, data, config }),
});
