import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { z } from 'zod';

export const updateLockArgsSchema = z.object({
  path: z.string(),
  locktoken: z.string(),
  config: PloneClientConfigSchema,
});

export type UpdateLockArgs = z.infer<typeof updateLockArgsSchema>;

export const updateLock = async ({
  path,
  locktoken,
  config,
}: UpdateLockArgs): Promise<undefined> => {
  const validatedArgs = updateLockArgsSchema.parse({
    path,
    locktoken,
    config,
  });

  const options: ApiRequestParams = {
    headers: {
      'Lock-Token': validatedArgs.locktoken,
    },
    config: validatedArgs.config,
  };
  return apiRequest('patch', validatedArgs.path, options);
};

export const updateLockMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'lock'],
  mutationFn: ({ path, locktoken }: Omit<UpdateLockArgs, 'config'>) =>
    updateLock({ path, locktoken, config }),
});
