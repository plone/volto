import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { DatabaseResponse } from '../../interfaces/database';

export type DatabaseArgs = {
  config: PloneClientConfig;
};

export const getDatabase = async ({
  config,
}: DatabaseArgs): Promise<DatabaseResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@database', options);
};

export const getDatabaseQuery = ({ config }: DatabaseArgs) => ({
  queryKey: ['get', 'database'],
  queryFn: () => getDatabase({ config }),
});
