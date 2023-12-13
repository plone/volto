import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { createGroupDataSchema } from '../../validation/groups';
import { CreateGroupResponse } from '@plone/types';

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
