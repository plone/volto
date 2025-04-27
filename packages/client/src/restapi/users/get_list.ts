import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetUsersResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getUsersSchema = z.object({
  query: z.string().optional(),
  groupsFilter: z.array(z.string()).optional(),
  search: z.string().optional(),
  limit: z.number().optional(),
});

export type GetUsersArgs = z.infer<typeof getUsersSchema>;

export async function getUsers(
  this: PloneClient,
  { query, groupsFilter, search, limit }: GetUsersArgs,
): Promise<RequestResponse<GetUsersResponse>> {
  const validatedArgs = getUsersSchema.parse({
    query,
    groupsFilter,
    search,
    limit,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {
      ...(validatedArgs.query && { query: validatedArgs.query }),
      ...(validatedArgs.groupsFilter && {
        'groups-filter': validatedArgs.groupsFilter,
      }),
      ...(validatedArgs.limit && { limit: validatedArgs.limit }),
      ...(validatedArgs.search && { search: validatedArgs.search }),
    },
  };

  return apiRequest('get', '/@users', options);
}
