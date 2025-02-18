import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { Addons } from '@plone/types';

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
