import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';

export const deleteGroupArgsSchema = z.object({
  groupId: z.string(),
  config: PloneClientConfigSchema,
});

type DeleteGroupArgs = z.infer<typeof deleteGroupArgsSchema>;

export const deleteGroup = async ({
  groupId,
  config,
}: DeleteGroupArgs): Promise<undefined> => {
  const validatedArgs = deleteGroupArgsSchema.parse({
    groupId,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const groupName = `/@groups/${validatedArgs.groupId}`;

  return apiRequest('delete', groupName, options);
};

export const deleteGroupMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'groups'],
  mutationFn: ({ groupId }: Omit<DeleteGroupArgs, 'config'>) =>
    deleteGroup({ groupId, config }),
});
