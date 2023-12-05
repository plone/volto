import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetSystemResponse } from '../../interfaces/system';

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
