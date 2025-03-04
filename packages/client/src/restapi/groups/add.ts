import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  CreateGroupResponse,
  createGroupDataSchema,
} from '../../interfaces/groups';

export const createGroupArgsSchema = z.object({
  data: createGroupDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateGroupArgs = z.infer<typeof createGroupArgsSchema>;

export const createGroup = async ({
  data,
  config,
}: CreateGroupArgs): Promise<CreateGroupResponse> => {
  const validatedArgs = createGroupArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@groups', options);
};

export const createGroupMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'groups'],
  mutationFn: ({ data }: Omit<CreateGroupArgs, 'config'>) =>
    createGroup({ data, config }),
});
