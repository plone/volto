import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import type { User as GetUserResponse } from '@plone/types';

const getUserSchema = z.object({
  userId: z.string(),
});

export type UserArgs = z.infer<typeof getUserSchema> & {
  config: PloneClientConfig;
};

export const getUser = async ({
  userId,
  config,
}: UserArgs): Promise<GetUserResponse> => {
  const validatedArgs = getUserSchema.parse({
    userId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const userName = `@users/${validatedArgs.userId}`;

  return apiRequest('get', userName, options);
};

export const getUserQuery = ({ userId, config }: UserArgs) => ({
  queryKey: [userId, 'get', 'users'],
  queryFn: () => getUser({ userId, config }),
});
