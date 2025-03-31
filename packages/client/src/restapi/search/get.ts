import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import { searchSchema } from '../../validation/search';
import type { SearchResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const flattenToDottedNotation = (
  obj: Record<string, any>,
  prefix = '',
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      Object.assign(result, flattenToDottedNotation(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
};

export type SearchArgs = z.infer<typeof searchSchema>;

export async function search(
  this: PloneClient,
  { query }: SearchArgs,
): Promise<RequestResponse<SearchResponse>> {
  const validatedArgs = searchSchema.parse({
    query,
  });

  const flattenedQuery = flattenToDottedNotation(validatedArgs.query);

  const options: ApiRequestParams = {
    config: this.config,
    params: {
      ...flattenedQuery,
      'path.query': undefined,
    },
  };

  return apiRequest('get', `${query.path?.query ?? ''}/@search`, options);
}
