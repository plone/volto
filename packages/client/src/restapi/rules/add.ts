import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import type { RuleRespose as CreateRuleResponse } from '@plone/types';

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
