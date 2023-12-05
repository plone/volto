import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updatePasswordDataSchema } from '../../interfaces/users';

export const updatePasswordArgsSchema = z.object({
  userId: z.string(),
  data: updatePasswordDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdatePasswordArgs = z.infer<typeof updatePasswordArgsSchema>;

export const updatePassword = async ({
  userId,
  data,
  config,
}: UpdatePasswordArgs): Promise<undefined> => {
  const validatedArgs = updatePasswordArgsSchema.parse({
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

export const updatePasswordMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'user'],
  mutationFn: ({ userId, data }: Omit<UpdatePasswordArgs, 'config'>) =>
    updatePassword({ userId, data, config }),
});
