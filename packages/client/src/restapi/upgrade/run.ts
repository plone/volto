import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { runUpgradeDataSchema } from '../../validation/upgrade';
import type { RunUpgradeResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const runUpgradeArgsSchema = z.object({
  data: runUpgradeDataSchema,
});

export type RunUpgradeArgs = z.infer<typeof runUpgradeArgsSchema>;

export async function runUpgrade(
  this: PloneClient,
  { data }: RunUpgradeArgs,
): Promise<RequestResponse<RunUpgradeResponse>> {
  const validatedArgs = runUpgradeArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('post', '/@upgrade', options);
}
