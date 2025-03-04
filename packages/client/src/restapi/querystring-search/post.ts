import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { querystringSearchDataSchema as postQuerystringSearchDataSchema } from '../../validation/querystring-search';
import type { QuerystringSearchResponse as PostQuerystringSearchResponse } from '@plone/types';

export const postQuerystringSearchArgsSchema = z.object({
  data: postQuerystringSearchDataSchema,
  config: PloneClientConfigSchema,
});

export type PostQuerystringSearchArgs = z.infer<
  typeof postQuerystringSearchArgsSchema
>;

export const postQuerystringSearch = async ({
  data,
  config,
}: PostQuerystringSearchArgs): Promise<PostQuerystringSearchResponse> => {
  const validatedArgs = postQuerystringSearchArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@querystring-search', options);
};

export const postQuerystringSearchMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'querystring-search'],
  mutationFn: ({ data }: Omit<PostQuerystringSearchArgs, 'config'>) =>
    postQuerystringSearch({ data, config }),
});
