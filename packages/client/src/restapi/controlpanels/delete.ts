import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const deleteControlpanelArgsSchema = z.object({
  path: z.string(),
  data: z.any(),
  config: PloneClientConfigSchema,
});

export type DeleteControlpanelArgs = z.infer<
  typeof deleteControlpanelArgsSchema
>;

export const deleteControlpanel = async ({
  path,
  data,
  config,
}: DeleteControlpanelArgs): Promise<any> => {
  const validatedArgs = deleteControlpanelArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const deleteControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('delete', deleteControlpanelPath, options);
};

export const deleteControlpanelMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'controlpanels'],
  mutationFn: ({ path, data }: Omit<DeleteControlpanelArgs, 'config'>) =>
    deleteControlpanel({ path, data, config }),
});
