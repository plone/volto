import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const getHistoryVersionedSchema = z.object({
  path: z.string(),
  version: z.number(),
});

export type HistoryVersionedArgs = z.infer<typeof getHistoryVersionedSchema> & {
  config: PloneClientConfig;
};

export const getHistoryVersioned = async ({
  path,
  version,
  config,
}: HistoryVersionedArgs): Promise<unknown> => {
  const validatedArgs = getHistoryVersionedSchema.parse({
    path,
    version,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const historyPath = `${validatedArgs.path}/@history/${validatedArgs.version}`;

  return apiRequest('get', historyPath, options);
};

export const getHistoryVersionedQuery = ({
  path,
  version,
  config,
}: HistoryVersionedArgs) => ({
  queryKey: [path, 'get', 'history'],
  queryFn: () => getHistoryVersioned({ path, version, config }),
});
