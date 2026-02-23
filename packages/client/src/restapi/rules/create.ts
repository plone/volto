import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import type { RuleRespose as CreateRuleResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createRuleArgsSchema = z.object({
  ruleId: z.string(),
});

export type CreateRuleArgs = z.infer<typeof createRuleArgsSchema>;

export async function createRule(
  this: PloneClient,
  { ruleId }: CreateRuleArgs,
): Promise<RequestResponse<CreateRuleResponse>> {
  const validatedArgs = createRuleArgsSchema.parse({
    ruleId,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const addRulePath = `/@content-rules/${validatedArgs.ruleId}`;

  return apiRequest('post', addRulePath, options);
}
