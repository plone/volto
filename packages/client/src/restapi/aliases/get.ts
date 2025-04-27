import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetAliasesResponse } from '@plone/types';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getAliasesSchema = z.object({
  path: z.string(),
});

export type AliasesArgs = z.infer<typeof getAliasesSchema>;

export async function getAliases(
  this: PloneClient,
  { path }: AliasesArgs,
): Promise<RequestResponse<GetAliasesResponse>> {
  const validatedArgs = getAliasesSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const aliasesPath = `${validatedArgs.path}/@aliases`;

  return apiRequest('get', aliasesPath, options);
}
