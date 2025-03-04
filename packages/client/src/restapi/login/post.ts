import { Login } from '../../interfaces/login';
import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import { PloneClientConfigSchema } from '../../interfaces/config';

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

export const loginQuery = ({ username, password, config }: LoginArgs) => ({
  queryKey: [username, 'login'],
  queryFn: () => login({ username, password, config }),
});
