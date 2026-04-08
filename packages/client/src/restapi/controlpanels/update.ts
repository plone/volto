import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const updateControlpanelArgsSchema = z.object({
  path: z.string(),
  data: z.any(),
  config: PloneClientConfigSchema,
});

export type UpdateControlpanelArgs = z.infer<
  typeof updateControlpanelArgsSchema
>;

export const updateControlpanel = async ({
  path,
  data,
  config,
}: UpdateControlpanelArgs): Promise<any> => {
  const validatedArgs = updateControlpanelArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('patch', updateControlpanelPath, options);
};

export const updateControlpanelMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'controlpanels'],
  mutationFn: ({ path, data }: Omit<UpdateControlpanelArgs, 'config'>) =>
    updateControlpanel({ path, data, config }),
});
