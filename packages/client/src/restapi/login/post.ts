import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import { z } from 'zod';
import type { Login } from '@plone/types';
import type { RequestResponse } from '../types';

export const loginArgsSchema = z.object({
  data: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

export type LoginArgs = z.infer<typeof loginArgsSchema>;

export async function login(
  this: PloneClient,
  { data }: LoginArgs,
): Promise<RequestResponse<Login>> {
  const validatedArgs = loginArgsSchema.parse({ data });

  const options: ApiRequestParams = {
    data: {
      login: validatedArgs.data.username,
      password: validatedArgs.data.password,
    },
    config: this.config,
  };
  return apiRequest('post', '/@login', options);
}
