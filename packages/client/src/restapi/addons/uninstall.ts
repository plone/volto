import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const uninstallAddonSchema = z.object({
  id: z.string(),
});

export type UninstallAddonArgs = z.infer<typeof uninstallAddonSchema>;

export async function uninstallAddon(
  this: PloneClient,
  { id }: UninstallAddonArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = uninstallAddonSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.id}/uninstall`;

  return apiRequest('post', addonName, options);
}
