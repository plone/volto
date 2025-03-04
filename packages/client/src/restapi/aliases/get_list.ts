import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetAliasesListResponse } from '../../interfaces/aliases';

export type AliasesListArgs = {
  config: PloneClientConfig;
};

export const getAliasesList = async ({
  config,
}: AliasesListArgs): Promise<GetAliasesListResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@aliases', options);
};

export const getAliasesListQuery = ({ config }: AliasesListArgs) => ({
  queryKey: ['get', 'aliases'],
  queryFn: () => getAliasesList({ config }),
});
