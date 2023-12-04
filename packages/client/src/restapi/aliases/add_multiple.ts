import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { createAliasesMultipleDataSchema } from '../../interfaces/aliases';

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
