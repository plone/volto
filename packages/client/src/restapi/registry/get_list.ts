import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetRegistriesResponse } from '../../interfaces/registry';

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
