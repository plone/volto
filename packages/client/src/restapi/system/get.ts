import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetSystemResponse } from '@plone/types';

export type GetSystemArgs = {
  config: PloneClientConfig;
};

export const getSystem = async ({
  config,
}: GetSystemArgs): Promise<GetSystemResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@system', options);
};

export const getSystemQuery = ({ config }: GetSystemArgs) => ({
  queryKey: ['get', 'system'],
  queryFn: () => getSystem({ config }),
});
