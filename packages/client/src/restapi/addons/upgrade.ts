import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const upgradeAddonSchema = z.object({
  addonId: z.string(),
});

export type UpgradeAddonArgs = z.infer<typeof upgradeAddonSchema>;

export async function upgradeAddon(
  this: PloneClient,
  { addonId }: UpgradeAddonArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = upgradeAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/upgrade`;

  return apiRequest('post', addonName, options);
}
