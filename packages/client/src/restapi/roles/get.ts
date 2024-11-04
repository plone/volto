import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetRolesResponse } from '@plone/types';

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
