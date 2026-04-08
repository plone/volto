import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';

const upgradeAddonSchema = z.object({
  addonId: z.string(),
});

export type UpgradeAddonArgs = z.infer<typeof upgradeAddonSchema> & {
  config: PloneClientConfig;
};

export const upgradeAddon = async ({
  addonId,
  config,
}: UpgradeAddonArgs): Promise<undefined> => {
  const validatedArgs = upgradeAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/upgrade`;

  return apiRequest('post', addonName, options);
};

export const upgradeAddonMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<UpgradeAddonArgs, 'config'>) =>
    upgradeAddon({ addonId, config }),
});
