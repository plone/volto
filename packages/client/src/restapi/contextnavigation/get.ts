import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { ContextNavigationResponse } from '@plone/types';
import { z } from 'zod';

const getContextNavigationSchema = z.object({
  path: z.string(),
});

export type ContextNavigationArgs = z.infer<
  typeof getContextNavigationSchema
> & {
  config: PloneClientConfig;
};

export const getContextNavigation = async ({
  path,
  config,
}: ContextNavigationArgs): Promise<ContextNavigationResponse> => {
  const validatedArgs = getContextNavigationSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const contextnavigationPath = `${validatedArgs.path}/@contextnavigation`;

  return apiRequest('get', contextnavigationPath, options);
};

export const getContextNavigationQuery = ({
  path,
  config,
}: ContextNavigationArgs) => ({
  queryKey: [path, 'get', 'contextnavigation'],
  queryFn: () => getContextNavigation({ path, config }),
});
