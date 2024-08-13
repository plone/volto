import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetAliasesResponse } from '@plone/types';
import { z } from 'zod';

const getAliasesSchema = z.object({
  path: z.string(),
});

export type AliasesArgs = z.infer<typeof getAliasesSchema> & {
  config: PloneClientConfig;
};

export const getAliases = async ({
  path,
  config,
}: AliasesArgs): Promise<GetAliasesResponse> => {
  const validatedArgs = getAliasesSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const aliasesPath = `${validatedArgs.path}/@aliases`;

  return apiRequest('get', aliasesPath, options);
};

export const getAliasesQuery = ({ path, config }: AliasesArgs) => ({
  queryKey: [path, 'get', 'aliases'],
  queryFn: () => getAliases({ path, config }),
});
