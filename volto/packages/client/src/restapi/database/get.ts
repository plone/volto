import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { DatabaseResponse } from '@plone/types';

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
