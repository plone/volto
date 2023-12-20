import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { GetControlpanelResponse } from '@plone/types';

const getControlpanelSchema = z.object({
  path: z.string(),
});

export type ControlpanelArgs = z.infer<typeof getControlpanelSchema> & {
  config: PloneClientConfig;
};

export const getControlpanel = async ({
  path,
  config,
}: ControlpanelArgs): Promise<GetControlpanelResponse> => {
  const validatedArgs = getControlpanelSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const getControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('get', getControlpanelPath, options);
};

export const getControlpanelQuery = ({ path, config }: ControlpanelArgs) => ({
  queryKey: [path, 'get', 'controlpanels'],
  queryFn: () => getControlpanel({ path, config }),
});
