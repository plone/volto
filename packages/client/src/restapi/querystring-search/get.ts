import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import { querystringSearchDataSchema as getQuerystringSearchSchema } from '../../validation/querystring-search';
import { QuerystringSearchResponse as GetQuerystringSearchResponse } from '@plone/types';

export type QuerystringSearchArgs = z.infer<
  typeof getQuerystringSearchSchema
> & {
  config: PloneClientConfig;
  locale?: string;
};

export const getQuerystringSearch = async ({
  config,
  locale,
  ...args
}: QuerystringSearchArgs): Promise<GetQuerystringSearchResponse> => {
  const validatedArgs = getQuerystringSearchSchema.parse({
    ...args,
  });
  const querystring = JSON.stringify(validatedArgs);
  const encodedQuery = encodeURIComponent(querystring);

  const options: ApiRequestParams = {
    config,
    params: {
      ...(encodedQuery && { query: encodedQuery }),
    },
  };

  return apiRequest(
    'get',
    `${locale ? `/${locale}` : ''}/@querystring-search`,
    options,
  );
};

export const getQuerystringSearchQuery = ({
  config,
  ...args
}: QuerystringSearchArgs) => ({
  queryKey: [args, 'get', 'querystringSearch'],
  queryFn: () => getQuerystringSearch({ ...args, config }),
});
