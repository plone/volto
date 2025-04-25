import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { updateRulesDataSchema } from '../../validation/rules';
import type { RuleRespose as UpdateRuleRespose } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateRulesArgsSchema = z.object({
  data: updateRulesDataSchema,
});

export type UpdateRulesArgs = z.infer<typeof updateRulesArgsSchema>;

export async function updateRules(
  this: PloneClient,
  { data }: UpdateRulesArgs,
): Promise<RequestResponse<UpdateRuleRespose>> {
  const validatedArgs = updateRulesArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('patch', '/@content-rules', options);
}
