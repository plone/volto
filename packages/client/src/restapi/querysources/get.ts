import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import type { GetQuerysourceResponse } from '@plone/types';

const getQuerysourceSchema = z.object({
  path: z.string(),
  field: z.string(),
  query: z.string(),
});

export type QuerysourceArgs = z.infer<typeof getQuerysourceSchema> & {
  config: PloneClientConfig;
};

export const getQuerysource = async ({
  path,
  field,
  query,
  config,
}: QuerysourceArgs): Promise<GetQuerysourceResponse> => {
  const validatedArgs = getQuerysourceSchema.parse({
    path,
    field,
    query,
  });

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs.query && { query: validatedArgs.query }),
    },
  };

  const querysourcePath = `/${validatedArgs.path}/@querysources/${field}`;

  return apiRequest('get', querysourcePath, options);
};

export const getQuerysourceQuery = ({
  path,
  field,
  query,
  config,
}: QuerysourceArgs) => ({
  queryKey: [path, field, query, 'get', 'querysources'],
  queryFn: () => getQuerysource({ path, field, query, config }),
});
