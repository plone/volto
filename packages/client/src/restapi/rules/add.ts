import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { RuleRespose as CreateRuleResponse } from '../../interfaces/rules';

export const createRuleArgsSchema = z.object({
  ruleId: z.string(),
  config: PloneClientConfigSchema,
});

export type CreateRuleArgs = z.infer<typeof createRuleArgsSchema>;

export const createRule = async ({
  ruleId,
  config,
}: CreateRuleArgs): Promise<CreateRuleResponse> => {
  const validatedArgs = createRuleArgsSchema.parse({
    ruleId,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const addRulePath = `/@content-rules/${validatedArgs.ruleId}`;

  return apiRequest('post', addRulePath, options);
};

export const createRuleMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'rules'],
  mutationFn: ({ ruleId }: Omit<CreateRuleArgs, 'config'>) =>
    createRule({ ruleId, config }),
});
