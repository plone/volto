import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetRelationsResponse } from '../../interfaces/relations';

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
