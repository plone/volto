import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetRelationsListResponse } from '@plone/types';

export type GetRelationsListArgs = {
  config: PloneClientConfig;
};

export const getRelationsList = async ({
  config,
}: GetRelationsListArgs): Promise<GetRelationsListResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@relations', options);
};

export const getRelationsListQuery = ({ config }: GetRelationsListArgs) => ({
  queryKey: ['get', 'relations'],
  queryFn: () => getRelationsList({ config }),
});
