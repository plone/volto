import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { createRelationsDataSchema } from '../../interfaces/relations';

export const createRelationsArgsSchema = z.object({
  data: createRelationsDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateRelationsArgs = z.infer<typeof createRelationsArgsSchema>;

export const createRelations = async ({
  data,
  config,
}: CreateRelationsArgs): Promise<undefined> => {
  const validatedArgs = createRelationsArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@relations', options);
};

export const createRelationsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'relations'],
  mutationFn: ({ data }: Omit<CreateRelationsArgs, 'config'>) =>
    createRelations({ data, config }),
});
