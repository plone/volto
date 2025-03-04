import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { createLockDataSchema } from '../../validation/lock';
import type { CreateLockResponse } from '@plone/types';

export const createLockArgsSchema = z.object({
  path: z.string(),
  data: createLockDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateLockArgs = z.infer<typeof createLockArgsSchema>;

export const createLock = async ({
  path,
  data,
  config,
}: CreateLockArgs): Promise<CreateLockResponse> => {
  const validatedArgs = createLockArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };
  const addLockPath = `/${validatedArgs.path}/@lock`;

  return apiRequest('post', addLockPath, options);
};

export const createLockMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'lock'],
  mutationFn: ({ path, data }: Omit<CreateLockArgs, 'config'>) =>
    createLock({ path, data, config }),
});
