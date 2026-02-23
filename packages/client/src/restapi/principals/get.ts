import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetPrincipalsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getPrincipalsSchema = z.object({
  search: z.string(),
});

export type PrincipalsArgs = z.infer<typeof getPrincipalsSchema>;

export async function getPrincipals(
  this: PloneClient,
  { search }: PrincipalsArgs,
): Promise<RequestResponse<GetPrincipalsResponse>> {
  const validatedArgs = getPrincipalsSchema.parse({
    search,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const principalsPath = `/@principals?search=${validatedArgs.search}`;

  return apiRequest('get', principalsPath, options);
}
