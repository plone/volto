import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { BreadcrumbsResponse } from '../../interfaces/breadcrumbs';
import { z } from 'zod';

const getBreadcrumbsSchema = z.object({
  path: z.string(),
});

export type BreadcrumbsArgs = z.infer<typeof getBreadcrumbsSchema> & {
  config: PloneClientConfig;
};

export const getBreadcrumbs = async ({
  path,
  config,
}: BreadcrumbsArgs): Promise<BreadcrumbsResponse> => {
  const validatedArgs = getBreadcrumbsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const breadcrumbsPath = `${validatedArgs.path}/@breadcrumbs`;

  return apiRequest('get', breadcrumbsPath, options);
};

export const getBreadcrumbsQuery = ({ path, config }: BreadcrumbsArgs) => ({
  queryKey: [path, 'get', 'breadcrumbs'],
  queryFn: () => getBreadcrumbs({ path, config }),
});
