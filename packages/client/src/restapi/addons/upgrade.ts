import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const upgradeAddonSchema = z.object({
  id: z.string(),
});

export type UpgradeAddonArgs = z.infer<typeof upgradeAddonSchema>;

export async function upgradeAddon(
  this: PloneClient,
  { id }: UpgradeAddonArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = upgradeAddonSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.id}/upgrade`;

  return apiRequest('post', addonName, options);
}
