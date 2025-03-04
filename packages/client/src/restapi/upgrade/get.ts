import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetUpgradeResponse } from '../../interfaces/upgrade';

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
