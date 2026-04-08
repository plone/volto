import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetGroupsResponse } from '@plone/types';

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
