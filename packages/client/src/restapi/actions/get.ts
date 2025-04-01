import { apiRequest, type ApiRequestParams } from '../../api';
import type { ActionsResponse } from '@plone/types';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getActionsSchema = z.object({
  path: z.string(),
});

export type ActionsArgs = z.infer<typeof getActionsSchema>;

export async function getActions(
  this: PloneClient,
  { path }: ActionsArgs,
): Promise<RequestResponse<ActionsResponse>> {
  const validatedArgs = getActionsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const actionsPath = `${validatedArgs.path}/@actions`;

  return apiRequest('get', actionsPath, options);
}
