import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetControlpanelsResponse } from '@plone/types';

export type ControlpanelsArgs = {
  config: PloneClientConfig;
};

export const getControlpanels = async ({
  config,
}: ControlpanelsArgs): Promise<GetControlpanelsResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@controlpanels', options);
};

export const getControlpanelsQuery = ({ config }: ControlpanelsArgs) => ({
  queryKey: ['get', 'controlpanels'],
  queryFn: () => getControlpanels({ config }),
});
