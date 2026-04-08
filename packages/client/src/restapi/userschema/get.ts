import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetUserschemaResponse } from '@plone/types';

export type GetUserschemaArgs = {
  config: PloneClientConfig;
};

export const getUserschema = async ({
  config,
}: GetUserschemaArgs): Promise<GetUserschemaResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@userschema', options);
};

export const getUserschemaQuery = ({ config }: GetUserschemaArgs) => ({
  queryKey: ['get', 'userschema'],
  queryFn: () => getUserschema({ config }),
});
