import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';

export const checkInWorkingcopyArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

export type CheckInWorkingcopyArgs = z.infer<
  typeof checkInWorkingcopyArgsSchema
>;

export const checkInWorkingcopy = async ({
  path,
  config,
}: CheckInWorkingcopyArgs): Promise<undefined> => {
  const validatedArgs = checkInWorkingcopyArgsSchema.parse({
    path,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const checkInWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('patch', checkInWorkingcopyPath, options);
};

export const checkInWorkingcopyMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'workingcopy'],
  mutationFn: ({ path }: Omit<CheckInWorkingcopyArgs, 'config'>) =>
    checkInWorkingcopy({ path, config }),
});
