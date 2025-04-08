import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const uninstallAddonSchema = z.object({
  addonId: z.string(),
});

export type UninstallAddonArgs = z.infer<typeof uninstallAddonSchema>;

export async function uninstallAddon(
  this: PloneClient,
  { addonId }: UninstallAddonArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = uninstallAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}/uninstall`;

  return apiRequest('post', addonName, options);
}
