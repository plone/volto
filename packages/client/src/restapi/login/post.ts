import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import { z } from 'zod';
import type { Login } from '@plone/types';
import type { RequestResponse } from '../types';

export const loginArgsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginArgs = z.infer<typeof loginArgsSchema>;

export async function login(
  this: PloneClient,
  { username, password }: LoginArgs,
): Promise<RequestResponse<Login>> {
  const validatedArgs = loginArgsSchema.parse({
    username,
    password,
  });

  const options: ApiRequestParams = {
    data: {
      login: validatedArgs.username,
      password: validatedArgs.password,
    },
    config: this.config,
  };
  return apiRequest('post', '/@login', options);
}
