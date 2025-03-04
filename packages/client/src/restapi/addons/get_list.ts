import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetAddonsResponse } from '../../interfaces/addons';

export type AddonsArgs = {
  config: PloneClientConfig;
};

export const getAddons = async ({
  config,
}: AddonsArgs): Promise<GetAddonsResponse> => {
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
