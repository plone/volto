import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { fixRelationsDataSchema } from '../../interfaces/relations';

export const fixRelationsArgsSchema = z.object({
  data: fixRelationsDataSchema.optional(),
  config: PloneClientConfigSchema,
});

export type FixRelationsArgs = z.infer<typeof fixRelationsArgsSchema>;

export const fixRelations = async ({
  data,
  config,
}: FixRelationsArgs): Promise<undefined> => {
  const validatedArgs = fixRelationsArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '@relations/rebuild', options);
};

export const fixRelationsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'relations'],
  mutationFn: ({ data }: Omit<FixRelationsArgs, 'config'>) =>
    fixRelations({ data, config }),
});
