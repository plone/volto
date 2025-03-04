import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetUpgradeResponse } from '@plone/types';

export type GetUpgradeArgs = {
  config: PloneClientConfig;
};

export const getUpgrade = async ({
  config,
}: GetUpgradeArgs): Promise<GetUpgradeResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@upgrade', options);
};

export const getUpgradeQuery = ({ config }: GetUpgradeArgs) => ({
  queryKey: ['get', 'upgrade'],
  queryFn: () => getUpgrade({ config }),
});
