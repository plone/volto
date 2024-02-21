import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { GetTypeResponse } from '@plone/types';

const getTypeSchema = z.object({
  contentPath: z.string(),
});

export type GetTypeArgs = z.infer<typeof getTypeSchema> & {
  config: PloneClientConfig;
};

export const getType = async ({
  contentPath,
  config,
}: GetTypeArgs): Promise<GetTypeResponse> => {
  const validatedArgs = getTypeSchema.parse({
    contentPath,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const contentPathPath = `/@types/${validatedArgs.contentPath}`;

  return apiRequest('get', contentPathPath, options);
};

export const getTypeQuery = ({ contentPath, config }: GetTypeArgs) => ({
  queryKey: [contentPath, 'get', 'types'],
  queryFn: () => getType({ contentPath, config }),
});
