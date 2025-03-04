import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetTypeFieldResponse } from '../../interfaces/types';

const getTypeFieldSchema = z.object({
  contentFieldPath: z.string(),
});

export type GetTypeFieldArgs = z.infer<typeof getTypeFieldSchema> & {
  config: PloneClientConfig;
};

export const getTypeField = async ({
  contentFieldPath,
  config,
}: GetTypeFieldArgs): Promise<GetTypeFieldResponse> => {
  const validatedArgs = getTypeFieldSchema.parse({
    contentFieldPath,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const contentFieldPathPath = `/@types/${validatedArgs.contentFieldPath}`;

  return apiRequest('get', contentFieldPathPath, options);
};

export const getTypeFieldQuery = ({
  contentFieldPath,
  config,
}: GetTypeFieldArgs) => ({
  queryKey: [contentFieldPath, 'get', 'types'],
  queryFn: () => getTypeField({ contentFieldPath, config }),
});
