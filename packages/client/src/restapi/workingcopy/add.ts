import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { CreateWorkingcopyResponse } from '../../interfaces/workingcopy';

export const createWorkingcopyArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

export type CreateWorkingcopyArgs = z.infer<typeof createWorkingcopyArgsSchema>;

export const createWorkingcopy = async ({
  path,
  config,
}: CreateWorkingcopyArgs): Promise<CreateWorkingcopyResponse> => {
  const validatedArgs = createWorkingcopyArgsSchema.parse({
    path,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };
  const createWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('post', createWorkingcopyPath, options);
};

export const createWorkingcopyMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'workingcopy'],
  mutationFn: ({ path }: Omit<CreateWorkingcopyArgs, 'config'>) =>
    createWorkingcopy({ path, config }),
});
