import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { deleteLockDataSchema } from '../../validation/lock';
import { LockInfo as DeleteLockResponse } from '@plone/types';

export const deleteLockArgsSchema = z.object({
  path: z.string(),
  data: deleteLockDataSchema.optional(),
  config: PloneClientConfigSchema,
});

type DeleteLockArgs = z.infer<typeof deleteLockArgsSchema>;

export const deleteLock = async ({
  path,
  data,
  config,
}: DeleteLockArgs): Promise<DeleteLockResponse> => {
  const validatedArgs = deleteLockArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const deleteLockPath = `/${validatedArgs.path}/@lock`;

  return apiRequest('delete', deleteLockPath, options);
};

export const deleteLockMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'lock'],
  mutationFn: ({ path, data }: Omit<DeleteLockArgs, 'config'>) =>
    deleteLock({ path, data, config }),
});
