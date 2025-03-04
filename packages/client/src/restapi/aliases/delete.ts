import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { deleteAliasesDataSchema } from '../../interfaces/aliases';

export const deleteAliasesArgsSchema = z.object({
  path: z.string(),
  data: deleteAliasesDataSchema,
  config: PloneClientConfigSchema,
});

type DeleteAliasesArgs = z.infer<typeof deleteAliasesArgsSchema>;

export const deleteAliases = async ({
  path,
  data,
  config,
}: DeleteAliasesArgs): Promise<undefined> => {
  const validatedArgs = deleteAliasesArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const aliasesPath = `${validatedArgs.path}/@aliases`;

  return apiRequest('delete', aliasesPath, options);
};

export const deleteAliasesMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'aliases'],
  mutationFn: ({ path, data }: Omit<DeleteAliasesArgs, 'config'>) =>
    deleteAliases({ path, data, config }),
});
