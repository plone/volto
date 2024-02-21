import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { Addons } from '@plone/types';

export type AddonsArgs = {
  config: PloneClientConfig;
};

export const getAddons = async ({ config }: AddonsArgs): Promise<Addons> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@addons', options);
};

export const getAddonsQuery = ({ config }: AddonsArgs) => ({
  queryKey: ['get', 'addons'],
  queryFn: () => getAddons({ config }),
});
