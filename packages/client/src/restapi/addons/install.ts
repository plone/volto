import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const installAddonSchema = z.object({
  addonId: z.string(),
});

export type InstallAddonArgs = z.infer<typeof installAddonSchema>;

export async function installAddon(
  this: PloneClient,
  { addonId }: InstallAddonArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = installAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/install`;

  return apiRequest('post', addonName, options);
}
