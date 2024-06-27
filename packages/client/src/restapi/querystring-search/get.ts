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
  currentPath?: string;
};

export const getQuerystringSearch = async ({
  config,
  locale,
  currentPath,
  ...args
}: QuerystringSearchArgs): Promise<GetQuerystringSearchResponse> => {
  const validatedArgs = getQuerystringSearchSchema.parse({
    ...args,
  });
  let query = validatedArgs.query;
  if (!query || query.length === 0) {
    // Emulate getFolderContents
    query.push({
      i: 'path',
      o: 'plone.app.querystring.operation.string.relativePath',
      v: `${currentPath ? `/${locale ?? ''}${currentPath}` : '.'}::1`,
    });
  } else {
    if (validatedArgs.depth) {
      query = validatedArgs.query.reduce((acc, curr) => {
        if (curr.i === 'path') {
          const finalPath =
            locale && !curr.v.includes(locale)
              ? `/${locale ?? ''}${curr.v}`
              : curr.v;
          return [
            ...acc,
            { i: curr.i, o: curr.o, v: `${finalPath}::${validatedArgs.depth}` },
          ];
        }
        return [...acc, curr];
      }, [] as typeof validatedArgs.query);
    }
  }
  const querystring = JSON.stringify({ ...validatedArgs, query });
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
