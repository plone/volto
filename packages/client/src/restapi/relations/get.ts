import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetRelationsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const getRelationsSchema = z
  .object({
    source: z.string().optional(),
    relation: z.string().optional(),
    onlyBroken: z.boolean().optional(),
  })
  .refine((data) => {
    return data.source !== undefined || data.relation !== undefined;
  });

export type RelationsArgs = z.infer<typeof getRelationsSchema>;

export async function getRelations(
  this: PloneClient,
  { source, relation, onlyBroken }: RelationsArgs,
): Promise<RequestResponse<GetRelationsResponse>> {
  const validatedArgs = getRelationsSchema.parse({
    source,
    relation,
    onlyBroken,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {
      ...(validatedArgs.source && { source: validatedArgs.source }),
      ...(validatedArgs.relation && { relation: validatedArgs.relation }),
      ...(validatedArgs.onlyBroken && { relation: validatedArgs.onlyBroken }),
    },
  };

  return apiRequest('get', '/@relations', options);
}
