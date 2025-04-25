import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const installAddonProfileSchema = z.object({
  addonId: z.string(),
  profile: z.string(),
});

export type InstallAddonProfileArgs = z.infer<typeof installAddonProfileSchema>;

export async function installAddonProfile(
  this: PloneClient,
  { addonId, profile }: InstallAddonProfileArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = installAddonProfileSchema.parse({
    addonId,
    profile,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/${profile}`;

  return apiRequest('post', addonName, options);
}
