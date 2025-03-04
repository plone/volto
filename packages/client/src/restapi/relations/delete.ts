import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { deleteRelationsDataSchema } from '../../interfaces/relations';

export const deleteRelationsArgsSchema = z.object({
  data: deleteRelationsDataSchema,
  config: PloneClientConfigSchema,
});

export type DeleteRelationsArgs = z.infer<typeof deleteRelationsArgsSchema>;

export const deleteRelations = async ({
  data,
  config,
}: DeleteRelationsArgs): Promise<undefined> => {
  const validatedArgs = deleteRelationsArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('delete', '/@relations', options);
};

export const deleteRelationsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'relations'],
  mutationFn: ({ data }: Omit<DeleteRelationsArgs, 'config'>) =>
    deleteRelations({ data, config }),
});
