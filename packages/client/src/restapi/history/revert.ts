import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { revertHistoryDataSchema } from '../../validation/history';

export const revertHistoryArgsSchema = z.object({
  path: z.string(),
  data: revertHistoryDataSchema,
  config: PloneClientConfigSchema,
});

export type ReverHistoryArgs = z.infer<typeof revertHistoryArgsSchema>;

export const revertHistory = async ({
  path,
  data,
  config,
}: ReverHistoryArgs): Promise<undefined> => {
  const validatedArgs = revertHistoryArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const historyPath = `${validatedArgs.path}/@history`;

  return apiRequest('patch', historyPath, options);
};

export const revertHistoryMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'history'],
  mutationFn: ({ path, data }: Omit<ReverHistoryArgs, 'config'>) =>
    revertHistory({ path, data, config }),
});
