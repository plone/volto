import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { updateRulesDataSchema } from '../../validation/rules';
import { RuleRespose as UpdateRuleRespose } from '@plone/types';

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
