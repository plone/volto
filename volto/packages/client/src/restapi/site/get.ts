import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetSiteResponse } from '@plone/types';

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
