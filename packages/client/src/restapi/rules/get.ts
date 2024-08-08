import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetRulesResponse } from '@plone/types';

export type GetRulesArgs = {
  config: PloneClientConfig;
};

export const getRules = async ({
  config,
}: GetRulesArgs): Promise<GetRulesResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@content-rules', options);
};

export const getRulesQuery = ({ config }: GetRulesArgs) => ({
  queryKey: ['get', 'rules'],
  queryFn: () => getRules({ config }),
});
