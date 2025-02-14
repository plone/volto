import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { querystringSearchDataSchema as getQuerystringSearchSchema } from '../../validation/querystring-search';
import type { QuerystringSearchResponse as GetQuerystringSearchResponse } from '@plone/types';

export type QuerystringSearchArgs = z.infer<
  typeof getQuerystringSearchSchema
> & {
  config: PloneClientConfig;
};

export const getQuerystringSearch = async ({
  query,
  config,
}: QuerystringSearchArgs): Promise<GetQuerystringSearchResponse> => {
  const validatedArgs = getQuerystringSearchSchema.parse({
    query,
  });

  const queryObject = { query: validatedArgs.query };
  const querystring = JSON.stringify(queryObject);
  const encodedQuery = encodeURIComponent(querystring);

  const options: ApiRequestParams = {
    config,
    params: {
      ...(encodedQuery && { query: encodedQuery }),
    },
  };

  return apiRequest('get', '/@querystring-search', options);
};

export const getQuerystringSearchQuery = ({
  query,
  config,
}: QuerystringSearchArgs) => ({
  queryKey: ['get', 'querystringSearch'],
  queryFn: () => getQuerystringSearch({ query, config }),
});
