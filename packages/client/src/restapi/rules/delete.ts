import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { deleteRulesDataSchema } from '../../validation/rules';

export const deleteRulesArgsSchema = z.object({
  data: deleteRulesDataSchema,
  config: PloneClientConfigSchema,
});

type DeleteRulesArgs = z.infer<typeof deleteRulesArgsSchema>;

export const deleteRules = async ({
  data,
  config,
}: DeleteRulesArgs): Promise<undefined> => {
  const validatedArgs = deleteRulesArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const deleteRulesPath = `/@content-rules`;

  return apiRequest('delete', deleteRulesPath, options);
};

export const deleteRulesMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'rules'],
  mutationFn: ({ data }: Omit<DeleteRulesArgs, 'config'>) =>
    deleteRules({ data, config }),
});
