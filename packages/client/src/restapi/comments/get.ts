import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { GetCommentsResponse } from '@plone/types';

const getCommentsSchema = z.object({
  path: z.string(),
});

export type CommentsArgs = z.infer<typeof getCommentsSchema> & {
  config: PloneClientConfig;
};

export const getComments = async ({
  path,
  config,
}: CommentsArgs): Promise<GetCommentsResponse> => {
  const validatedArgs = getCommentsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const commentsPath = `/${validatedArgs.path}/@comments`;

  return apiRequest('get', commentsPath, options);
};

export const getCommentsQuery = ({ path, config }: CommentsArgs) => ({
  queryKey: [path, 'get', 'comments'],
  queryFn: () => getComments({ path, config }),
});
