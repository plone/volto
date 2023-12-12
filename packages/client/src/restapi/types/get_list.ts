import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetTypesResponse } from '@plone/types';

export type GetTypesArgs = {
  config: PloneClientConfig;
};

export const getTypes = async ({
  config,
}: GetTypesArgs): Promise<GetTypesResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@types', options);
};

export const getTypesQuery = ({ config }: GetTypesArgs) => ({
  queryKey: ['get', 'types'],
  queryFn: () => getTypes({ config }),
});
