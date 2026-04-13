import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetAddonResponse } from '@plone/types';
import type PloneClient from '../../client';
import { z } from 'zod';
import type { RequestResponse } from '../types';

const getAddonSchema = z.object({
  id: z.string(),
});

export type AddonArgs = z.infer<typeof getAddonSchema> & {};

export async function getAddon(
  this: PloneClient,
  { id }: AddonArgs,
): Promise<RequestResponse<GetAddonResponse>> {
  const validatedArgs = getAddonSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const addonName = `@addons/${validatedArgs.id}`;

  return apiRequest('get', addonName, options);
}
