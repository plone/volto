import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { createUserDataSchema } from '../../validation/users';
import type { User as CreateUserResponse } from '@plone/types';

export const createUserArgsSchema = z.object({
  data: createUserDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateUserArgs = z.infer<typeof createUserArgsSchema>;

export const createUser = async ({
  data,
  config,
}: CreateUserArgs): Promise<CreateUserResponse> => {
  const validatedArgs = createUserArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@users', options);
};

export const createUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'users'],
  mutationFn: ({ data }: Omit<CreateUserArgs, 'config'>) =>
    createUser({ data, config }),
});
