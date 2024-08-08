import { Login } from '@plone/types';
import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const loginArgsSchema = z.object({
  username: z.string(),
  password: z.string(),
  config: PloneClientConfigSchema,
});

export type LoginArgs = z.infer<typeof loginArgsSchema>;

export const login = ({
  username,
  password,
  config,
}: LoginArgs): Promise<Login> => {
  const validatedArgs = loginArgsSchema.parse({
    username,
    password,
    config,
  });

  const options: ApiRequestParams = {
    data: {
      login: validatedArgs.username,
      password: validatedArgs.password,
    },
    config: validatedArgs.config,
  };
  return apiRequest('post', '/@login', options);
};

export const loginMutation = ({ config }: { config: PloneClientConfig }) => ({
  mutationKey: ['login'],
  mutationFn: ({ username, password }: Omit<LoginArgs, 'config'>) =>
    login({ username, password, config }),
});
