import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetSiteResponse } from '../../interfaces/site';

export type SiteArgs = {
  config: PloneClientConfig;
};

export const getSite = async ({
  config,
}: SiteArgs): Promise<GetSiteResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@site', options);
};

export const getSiteQuery = ({ config }: SiteArgs) => ({
  queryKey: ['get', 'site'],
  queryFn: () => getSite({ config }),
});
