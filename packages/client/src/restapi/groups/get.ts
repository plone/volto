import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetGroupResponse } from '../../interfaces/groups';

const getGroupSchema = z.object({
  groupId: z.string(),
});

export type GroupArgs = z.infer<typeof getGroupSchema> & {
  config: PloneClientConfig;
};

export const getGroup = async ({
  groupId,
  config,
}: GroupArgs): Promise<GetGroupResponse> => {
  const validatedArgs = getGroupSchema.parse({
    groupId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const groupName = `@groups/${validatedArgs.groupId}`;

  return apiRequest('get', groupName, options);
};

export const getGroupQuery = ({ groupId, config }: GroupArgs) => ({
  queryKey: [groupId, 'get', 'groups'],
  queryFn: () => getGroup({ groupId, config }),
});
