import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetWorkingcopyResponse } from '@plone/types';

const getWorkingcopySchema = z.object({
  path: z.string(),
});

export type GetWorkingcopyArgs = z.infer<typeof getWorkingcopySchema> & {
  config: PloneClientConfig;
};

export const getWorkingcopy = async ({
  path,
  config,
}: GetWorkingcopyArgs): Promise<GetWorkingcopyResponse> => {
  const validatedArgs = getWorkingcopySchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const workingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('get', workingcopyPath, options);
};

export const getWorkingcopyQuery = ({ path, config }: GetWorkingcopyArgs) => ({
  queryKey: [path, 'get', 'workingcopy'],
  queryFn: () => getWorkingcopy({ path, config }),
});
