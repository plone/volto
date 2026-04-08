import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetNavrootResponse } from '@plone/types';
import { z } from 'zod';

const getNavrootSchema = z.object({
  path: z.string(),
  language: z.string().optional(),
});

export type NavrootArgs = z.infer<typeof getNavrootSchema> & {
  config: PloneClientConfig;
};

export const getNavroot = async ({
  path,
  language,
  config,
}: NavrootArgs): Promise<GetNavrootResponse> => {
  const validatedArgs = getNavrootSchema.parse({
    path,
    language,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const navrootPath = language
    ? `/${validatedArgs.language}/${validatedArgs.path}/@navroot`
    : `/${validatedArgs.path}/@navroot`;

  return apiRequest('get', navrootPath, options);
};

export const getNavrootQuery = ({ path, config }: NavrootArgs) => ({
  queryKey: [path, 'get', 'navroot'],
  queryFn: () => getNavroot({ path, config }),
});
