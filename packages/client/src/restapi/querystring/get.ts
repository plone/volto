import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetQueryStringResponse } from '../../interfaces/querystring';

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
