import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetRegistriesResponse } from '@plone/types';

export type GetRegistriesArgs = {
  config: PloneClientConfig;
};

export const getRegistries = async ({
  config,
}: GetRegistriesArgs): Promise<GetRegistriesResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@registry', options);
};

export const getRegistriesQuery = ({ config }: GetRegistriesArgs) => ({
  queryKey: ['get', 'registry'],
  queryFn: () => getRegistries({ config }),
});
