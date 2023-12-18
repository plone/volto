import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { GetSourceResponse } from '@plone/types';

const getSourceSchema = z.object({
  path: z.string(),
  field: z.string(),
});

export type SourceArgs = z.infer<typeof getSourceSchema> & {
  config: PloneClientConfig;
};

export const getSource = async ({
  path,
  field,
  config,
}: SourceArgs): Promise<GetSourceResponse> => {
  const validatedArgs = getSourceSchema.parse({
    path,
    field,
  });

  const options: ApiRequestParams = {
    config,
  };

  const sourcePath = `/${validatedArgs.path}/@sources/${field}`;

  return apiRequest('get', sourcePath, options);
};

export const getSourceQuery = ({ path, field, config }: SourceArgs) => ({
  queryKey: [path, field, 'get', 'sources'],
  queryFn: () => getSource({ path, field, config }),
});
