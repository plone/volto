import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { createAliasesMultipleDataSchema } from '../../validation/aliases';

export const createAliasesMultipleArgsSchema = z.object({
  data: createAliasesMultipleDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateAliasesMultipleArgs = z.infer<
  typeof createAliasesMultipleArgsSchema
>;

export const createAliasesMultiple = async ({
  data,
  config,
}: CreateAliasesMultipleArgs): Promise<undefined> => {
  const validatedArgs = createAliasesMultipleArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@aliases', options);
};

export const createAliasesMultipleMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'aliases'],
  mutationFn: ({ data }: Omit<CreateAliasesMultipleArgs, 'config'>) =>
    createAliasesMultiple({ data, config }),
});
