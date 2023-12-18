import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';

const installAddonSchema = z.object({
  addonId: z.string(),
});

export type InstallAddonArgs = z.infer<typeof installAddonSchema> & {
  config: PloneClientConfig;
};

export const installAddon = async ({
  addonId,
  config,
}: InstallAddonArgs): Promise<undefined> => {
  const validatedArgs = installAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/install`;

  return apiRequest('post', addonName, options);
};

export const installAddonMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<InstallAddonArgs, 'config'>) =>
    installAddon({ addonId, config }),
});
