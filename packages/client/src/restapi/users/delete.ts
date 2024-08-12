import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const deleteUserArgsSchema = z.object({
  userId: z.string(),
  config: PloneClientConfigSchema,
});

type DeleteUserArgs = z.infer<typeof deleteUserArgsSchema>;

export const deleteUser = async ({
  userId,
  config,
}: DeleteUserArgs): Promise<undefined> => {
  const validatedArgs = deleteUserArgsSchema.parse({
    userId,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const userName = `/@users/${validatedArgs.userId}`;

  return apiRequest('delete', userName, options);
};

export const deleteUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'users'],
  mutationFn: ({ userId }: Omit<DeleteUserArgs, 'config'>) =>
    deleteUser({ userId, config }),
});
