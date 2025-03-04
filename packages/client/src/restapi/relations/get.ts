import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import type { GetRelationsResponse } from '@plone/types';

export const getRelationsSchema = z
  .object({
    source: z.string().optional(),
    relation: z.string().optional(),
    onlyBroken: z.boolean().optional(),
  })
  .refine((data) => {
    return data.source !== undefined || data.relation !== undefined;
  });

export type RelationsArgs = z.infer<typeof getRelationsSchema> & {
  config: PloneClientConfig;
};

export const getRelations = async ({
  source,
  relation,
  onlyBroken,
  config,
}: RelationsArgs): Promise<GetRelationsResponse> => {
  const validatedArgs = getRelationsSchema.parse({
    source,
    relation,
    onlyBroken,
  });

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs.source && { source: validatedArgs.source }),
      ...(validatedArgs.relation && { relation: validatedArgs.relation }),
      ...(validatedArgs.onlyBroken && { relation: validatedArgs.onlyBroken }),
    },
  };

  return apiRequest('get', '/@relations', options);
};

export const getRelationsQuery = ({
  source,
  relation,
  onlyBroken,
  config,
}: RelationsArgs) => ({
  queryKey: [source, relation, onlyBroken, 'get', 'relations'],
  queryFn: () => getRelations({ source, relation, onlyBroken, config }),
});
