import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetAddonResponse } from '@plone/types';
import type PloneClient from '../../client';
import { z } from 'zod';
import type { RequestResponse } from '../types';

const getAddonSchema = z.object({
  addonId: z.string(),
});

export type AddonArgs = z.infer<typeof getAddonSchema> & {};

export async function getAddon(
  this: PloneClient,
  { addonId }: AddonArgs,
): Promise<RequestResponse<GetAddonResponse>> {
  const validatedArgs = getAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.addonId}`;

  return apiRequest('get', addonName, options);
}
