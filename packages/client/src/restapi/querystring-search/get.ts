import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import { querystringSearchDataSchema } from '../../validation/querystring-search';
import type { QuerystringSearchResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export type QuerystringSearchArgs = z.infer<typeof querystringSearchDataSchema>;

export async function querystringSearch(
  this: PloneClient,
  { query, post }: QuerystringSearchArgs,
): Promise<RequestResponse<QuerystringSearchResponse>> {
  const validatedArgs = querystringSearchDataSchema.parse({
    query,
  });
  if (post) {
    const options: ApiRequestParams = {
      data: { query: validatedArgs.query },
      config: this.config,
    };

    return apiRequest('post', '/@querystring-search', options);
  } else {
    const queryObject = { query: validatedArgs.query };
    const querystring = JSON.stringify(queryObject);
    const encodedQuery = encodeURIComponent(querystring);

    const options: ApiRequestParams = {
      config: this.config,
      params: {
        ...(encodedQuery && { query: encodedQuery }),
      },
    };

    return apiRequest('get', '/@querystring-search', options);
  }
}
