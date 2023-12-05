import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetTypesResponse } from '../../interfaces/types';

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
