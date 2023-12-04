import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const uninstallAddonSchema = z.object({
  addonId: z.string(),
});

export type UninstallAddonArgs = z.infer<typeof uninstallAddonSchema> & {
  config: PloneClientConfig;
};

export const uninstallAddon = async ({
  addonId,
  config,
}: UninstallAddonArgs): Promise<undefined> => {
  const validatedArgs = uninstallAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/uninstall`;

  return apiRequest('post', addonName, options);
};

export const uninstallAddonMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<UninstallAddonArgs, 'config'>) =>
    uninstallAddon({ addonId, config }),
});
