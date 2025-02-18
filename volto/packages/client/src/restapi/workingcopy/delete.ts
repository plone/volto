import { apiRequest, type ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const deleteWorkingcopyArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

type DeleteWorkingcopyArgs = z.infer<typeof deleteWorkingcopyArgsSchema>;

export const deleteWorkingcopy = async ({
  path,
  config,
}: DeleteWorkingcopyArgs): Promise<undefined> => {
  const validatedArgs = deleteWorkingcopyArgsSchema.parse({
    path,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const deleteWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('delete', deleteWorkingcopyPath, options);
};

export const deleteWorkingcopyMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'workingcopy'],
  mutationFn: ({ path }: Omit<DeleteWorkingcopyArgs, 'config'>) =>
    deleteWorkingcopy({ path, config }),
});
