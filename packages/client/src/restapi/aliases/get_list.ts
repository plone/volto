import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetAliasesListResponse } from '@plone/types';

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
