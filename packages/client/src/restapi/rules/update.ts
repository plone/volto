import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  updateRulesDataSchema,
  RuleRespose as UpdateRuleRespose,
} from '../../interfaces/rules';

export const updateRulesArgsSchema = z.object({
  data: updateRulesDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateRulesArgs = z.infer<typeof updateRulesArgsSchema>;

export const updateRules = async ({
  data,
  config,
}: UpdateRulesArgs): Promise<UpdateRuleRespose> => {
  const validatedArgs = updateRulesArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('patch', '/@content-rules', options);
};

export const updateRulesMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'rules'],
  mutationFn: ({ data }: Omit<UpdateRulesArgs, 'config'>) =>
    updateRules({ data, config }),
});
