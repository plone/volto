import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfigSchema } from '../../validation/config';
import { z } from 'zod';
import { querystringSearchDataSchema as getQuerystringSearchSchema } from '../../validation/querystring-search';
import { QuerystringSearchResponse as GetQuerystringSearchResponse } from '@plone/types';

export const QuerystringSearchArgs = z.object({
  data: getQuerystringSearchSchema,
  config: PloneClientConfigSchema,
});

export type QuerystringSearchArgs = z.infer<typeof QuerystringSearchArgs>;

export const getQuerystringSearch = async ({
  data,
  config,
}: QuerystringSearchArgs): Promise<GetQuerystringSearchResponse> => {
  const validatedArgs = QuerystringSearchArgs.parse({
    data,
    config,
  });

  const queryObject = { query: validatedArgs.data.query };
  const querystring = JSON.stringify(queryObject);
  const encodedQuery = encodeURIComponent(querystring);
  const options: ApiRequestParams = {
    params: {
      ...data,
      ...(encodedQuery && { query: encodedQuery }),
    },
    config: validatedArgs.config,
  };

  return apiRequest('get', '/@querystring-search', options);
};

export const getQuerystringSearchQuery = ({
  data,
  config,
}: QuerystringSearchArgs) => ({
  queryKey: ['get', 'querystringSearch'],
  queryFn: () => getQuerystringSearch({ data, config }),
});
