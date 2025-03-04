import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { fixRelationsDataSchema } from '../../validation/relations';

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
