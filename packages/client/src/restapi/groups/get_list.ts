import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetGroupsResponse } from '../../interfaces/groups';

export type GroupsArgs = {
  config: PloneClientConfig;
};

export const getGroups = async ({
  config,
}: GroupsArgs): Promise<GetGroupsResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@groups', options);
};

export const getGroupsQuery = ({ config }: GroupsArgs) => ({
  queryKey: ['get', 'groups'],
  queryFn: () => getGroups({ config }),
});
