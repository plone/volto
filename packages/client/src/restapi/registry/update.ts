import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateRegistryDataSchema } from '../../interfaces/registry';

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
