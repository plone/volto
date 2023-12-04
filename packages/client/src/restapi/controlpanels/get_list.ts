import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetControlpanelsResponse } from '../../interfaces/controlpanels';

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
