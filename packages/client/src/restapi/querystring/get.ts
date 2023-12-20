import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetQueryStringResponse } from '@plone/types';

export type QueryStringArgs = {
  config: PloneClientConfig;
};

export const getQueryString = async ({
  config,
}: QueryStringArgs): Promise<GetQueryStringResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@querystring', options);
};

export const getQueryStringQuery = ({ config }: QueryStringArgs) => ({
  queryKey: ['get', 'querystring'],
  queryFn: () => getQueryString({ config }),
});
