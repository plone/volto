import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { NavigationResponse } from '@plone/types';
import { z } from 'zod';

const getNavigationSchema = z.object({
  path: z.string(),
  depth: z.number().optional(),
});

export type NavigationArgs = z.infer<typeof getNavigationSchema> & {
  config: PloneClientConfig;
};

export const getNavigation = async ({
  path,
  depth,
  config,
}: NavigationArgs): Promise<NavigationResponse> => {
  const validatedArgs = getNavigationSchema.parse({
    path,
    depth,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const navigationPath = `${validatedArgs.path}/@navigation`;
  if (validatedArgs.depth) {
    options.params['expand.navigation.depth'] = validatedArgs.depth;
  }

  return apiRequest('get', navigationPath, options);
};

export const getNavigationQuery = ({
  path,
  depth,
  config,
}: NavigationArgs) => ({
  queryKey: [path, depth, 'get', 'navigation'],
  queryFn: () => getNavigation({ path, depth, config }),
});
