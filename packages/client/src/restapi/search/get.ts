import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { getSearchSchema } from '../../validation/search';
import type { GetSearchResponse } from '@plone/types';
import { flattenToDottedNotation } from '../../utils/misc';

export type SearchArgs = z.infer<typeof getSearchSchema> & {
  config: PloneClientConfig;
};

export const getSearch = async ({
  query,
  config,
}: SearchArgs): Promise<GetSearchResponse> => {
  const validatedArgs = getSearchSchema.parse({
    query,
  });

  const flattenedQuery = flattenToDottedNotation(validatedArgs.query);

  const options: ApiRequestParams = {
    config,
    params: {
      ...flattenedQuery,
      'path.query': undefined,
    },
  };

  return apiRequest('get', `${query.path?.query ?? ''}/@search`, options);
};

export const getSearchQuery = ({ query, config }: SearchArgs) => ({
  queryKey: [query, 'get', 'search'],
  queryFn: () => getSearch({ query, config }),
});
