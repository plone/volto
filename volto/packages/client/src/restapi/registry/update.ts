import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { updateRegistryDataSchema } from '../../validation/registry';

export const updateRegistryArgsSchema = z.object({
  data: updateRegistryDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateRegistryArgs = z.infer<typeof updateRegistryArgsSchema>;

export const updateRegistry = async ({
  data,
  config,
}: UpdateRegistryArgs): Promise<undefined> => {
  const validatedArgs = updateRegistryArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('patch', '/@registry', options);
};

export const updateRegistryMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'registry'],
  mutationFn: ({ data }: Omit<UpdateRegistryArgs, 'config'>) =>
    updateRegistry({ data, config }),
});
