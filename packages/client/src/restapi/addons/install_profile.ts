import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const installAddonProfileSchema = z.object({
  addonId: z.string(),
  profile: z.string(),
});

export type InstallAddonProfileArgs = z.infer<
  typeof installAddonProfileSchema
> & {
  config: PloneClientConfig;
};

export const installAddonProfile = async ({
  addonId,
  profile,
  config,
}: InstallAddonProfileArgs): Promise<undefined> => {
  const validatedArgs = installAddonProfileSchema.parse({
    addonId,
    profile,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/${profile}`;

  return apiRequest('post', addonName, options);
};

export const installAddonProfileMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId, profile }: Omit<InstallAddonProfileArgs, 'config'>) =>
    installAddonProfile({ addonId, profile, config }),
});
