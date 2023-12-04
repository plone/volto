import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetRelationsListResponse } from '../../interfaces/relations';

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
