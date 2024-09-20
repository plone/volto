import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { querystringSearchDataSchema as getQuerystringSearchSchema } from '../../validation/querystring-search';
import { QuerystringSearchResponse as GetQuerystringSearchResponse } from '@plone/types';

export type QuerystringSearchArgs = z.infer<
  typeof getQuerystringSearchSchema
> & {
  config: PloneClientConfig;
  path?: string;
};

export const getQuerystringSearch = async ({
  query,
  config,
  path, // Add path parameter
}: QuerystringSearchArgs): Promise<GetQuerystringSearchResponse> => {
  const validatedArgs = getQuerystringSearchSchema.parse({
    query,
    path, // Include path in validation
  });
  const queryObject = { 
    query: validatedArgs.query,
    path: validatedArgs.path, // Include path in queryObject if it exists
  };
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
  path,
}: QuerystringSearchArgs) => ({
  queryKey: ['get', 'querystringSearch', path],
  queryFn: () => getQuerystringSearch({ query, config, path }),
});
