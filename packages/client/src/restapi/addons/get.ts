import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetAddonResponse } from '@plone/types';
import { z } from 'zod';

const getAddonSchema = z.object({
  addonId: z.string(),
});

export type AddonArgs = z.infer<typeof getAddonSchema> & {
  config: PloneClientConfig;
};

export const getAddon = async ({
  addonId,
  config,
}: AddonArgs): Promise<GetAddonResponse> => {
  const validatedArgs = getAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}`;

  return apiRequest('get', addonName, options);
};

export const getAddonQuery = ({ addonId, config }: AddonArgs) => ({
  queryKey: [addonId, 'get', 'addons'],
  queryFn: () => getAddon({ addonId, config }),
});
