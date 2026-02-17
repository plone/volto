import { apiRequest, type ApiRequestParams } from '../../api';
import type { ContextNavigationResponse } from '@plone/types';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getContextNavigationSchema = z.object({
  path: z.string(),
});

export type ContextNavigationArgs = z.infer<typeof getContextNavigationSchema>;

export async function getContextNavigation(
  this: PloneClient,
  { path }: ContextNavigationArgs,
): Promise<RequestResponse<ContextNavigationResponse>> {
  const validatedArgs = getContextNavigationSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const contextnavigationPath = `${validatedArgs.path}/@contextnavigation`;

  return apiRequest('get', contextnavigationPath, options);
}
