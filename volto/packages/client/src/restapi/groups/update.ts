import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { updateGroupDataSchema } from '../../validation/groups';

export const updateGroupArgsSchema = z.object({
  groupId: z.string(),
  data: updateGroupDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateGroupArgs = z.infer<typeof updateGroupArgsSchema>;

export const updateGroup = async ({
  groupId,
  data,
  config,
}: UpdateGroupArgs): Promise<undefined> => {
  const validatedArgs = updateGroupArgsSchema.parse({
    groupId,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const groupName = `/@groups/${validatedArgs.groupId}`;

  return apiRequest('patch', groupName, options);
};

export const updateGroupMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'groups'],
  mutationFn: ({ groupId, data }: Omit<UpdateGroupArgs, 'config'>) =>
    updateGroup({ groupId, data, config }),
});
