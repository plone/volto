import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetRolesResponse } from '@plone/types';

export type GetRolesArgs = {
  config: PloneClientConfig;
};

export const getRoles = async ({
  config,
}: GetRolesArgs): Promise<GetRolesResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@roles', options);
};

export const getRolesQuery = ({ config }: GetRolesArgs) => ({
  queryKey: ['get', 'roles'],
  queryFn: () => getRoles({ config }),
});
