import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { ActionsResponse } from '../../interfaces/actions';
import { z } from 'zod';

const getActionsSchema = z.object({
  path: z.string(),
});

export type ActionsArgs = z.infer<typeof getActionsSchema> & {
  config: PloneClientConfig;
};

export const getActions = async ({
  path,
  config,
}: ActionsArgs): Promise<ActionsResponse> => {
  const validatedArgs = getActionsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const actionsPath = `${validatedArgs.path}/@actions`;

  return apiRequest('get', actionsPath, options);
};

export const getActionsQuery = ({ path, config }: ActionsArgs) => ({
  queryKey: [path, 'get', 'actions'],
  queryFn: () => getActions({ path, config }),
});
