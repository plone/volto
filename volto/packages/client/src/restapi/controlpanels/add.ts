import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const createControlpanelArgsSchema = z.object({
  path: z.string(),
  data: z.any(),
  config: PloneClientConfigSchema,
});

export type CreateControlpanelArgs = z.infer<
  typeof createControlpanelArgsSchema
>;

export const createControlpanel = async ({
  path,
  data,
  config,
}: CreateControlpanelArgs): Promise<any> => {
  const validatedArgs = createControlpanelArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const createControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('post', createControlpanelPath, options);
};

export const createControlpanelMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'controlpanels'],
  mutationFn: ({ path, data }: Omit<CreateControlpanelArgs, 'config'>) =>
    createControlpanel({ path, data, config }),
});
