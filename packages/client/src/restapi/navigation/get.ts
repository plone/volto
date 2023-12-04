import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { NavigationResponse } from '../../interfaces/navigation';
import { z } from 'zod';

const getNavigationSchema = z.object({
  path: z.string(),
});

export type NavigationArgs = z.infer<typeof getNavigationSchema> & {
  config: PloneClientConfig;
};

export const getNavigation = async ({
  path,
  config,
}: NavigationArgs): Promise<NavigationResponse> => {
  const validatedArgs = getNavigationSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const navigationPath = `${validatedArgs.path}/@navigation`;

  return apiRequest('get', navigationPath, options);
};

export const getNavigationQuery = ({ path, config }: NavigationArgs) => ({
  queryKey: [path, 'get', 'navigation'],
  queryFn: () => getNavigation({ path, config }),
});
