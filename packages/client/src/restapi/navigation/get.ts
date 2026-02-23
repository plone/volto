import { apiRequest, type ApiRequestParams } from '../../api';
import type { NavigationResponse } from '@plone/types';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getNavigationSchema = z.object({
  path: z.string(),
  depth: z.number().optional(),
});

export type NavigationArgs = z.infer<typeof getNavigationSchema>;

export async function getNavigation(
  this: PloneClient,
  { path, depth }: NavigationArgs,
): Promise<RequestResponse<NavigationResponse>> {
  const validatedArgs = getNavigationSchema.parse({
    path,
    depth,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const navigationPath = `${validatedArgs.path}/@navigation`;
  if (validatedArgs.depth) {
    options.params['expand.navigation.depth'] = validatedArgs.depth;
  }

  return apiRequest('get', navigationPath, options);
}
