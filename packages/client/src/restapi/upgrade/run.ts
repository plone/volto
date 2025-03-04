import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { runUpgradeDataSchema } from '../../validation/upgrade';
import type { RunUpgradeResponse } from '@plone/types';

export const runUpgradeArgsSchema = z.object({
  data: runUpgradeDataSchema,
  config: PloneClientConfigSchema,
});

export type RunUpgradeArgs = z.infer<typeof runUpgradeArgsSchema>;

export const runUpgrade = async ({
  data,
  config,
}: RunUpgradeArgs): Promise<RunUpgradeResponse> => {
  const validatedArgs = runUpgradeArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@upgrade', options);
};

export const runUpgradeMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'upgrade'],
  mutationFn: ({ data }: Omit<RunUpgradeArgs, 'config'>) =>
    runUpgrade({ data, config }),
});
