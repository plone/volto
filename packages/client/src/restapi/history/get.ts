import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { GetHistoryResponse } from '@plone/types';

const getHistorySchema = z.object({
  path: z.string(),
});

export type HistoryArgs = z.infer<typeof getHistorySchema> & {
  config: PloneClientConfig;
};

export const getHistory = async ({
  path,
  config,
}: HistoryArgs): Promise<GetHistoryResponse> => {
  const validatedArgs = getHistorySchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const historyPath = `/${validatedArgs.path}/@history`;

  return apiRequest('get', historyPath, options);
};

export const getHistoryQuery = ({ path, config }: HistoryArgs) => ({
  queryKey: [path, 'get', 'history'],
  queryFn: () => getHistory({ path, config }),
});
