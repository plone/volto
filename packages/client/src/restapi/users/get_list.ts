import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetUsersResponse } from '@plone/types';

const getUsersSchema = z.object({
  query: z.string().optional(),
  groupsFilter: z.array(z.string()).optional(),
  search: z.string().optional(),
  limit: z.number().optional(),
});

export type GetUsersArgs = z.infer<typeof getUsersSchema> & {
  config: PloneClientConfig;
};

export const getUsers = async ({
  query,
  groupsFilter,
  search,
  limit,
  config,
}: GetUsersArgs): Promise<GetUsersResponse> => {
  const validatedArgs = getUsersSchema.parse({
    query,
    groupsFilter,
    search,
    limit,
  });

  const options: ApiRequestParams = {
    config,
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
};

export const getUsersQuery = ({
  query,
  groupsFilter,
  search,
  limit,
  config,
}: GetUsersArgs) => ({
  queryKey: [query, groupsFilter, search, limit, 'get', 'users'],
  queryFn: () => getUsers({ query, groupsFilter, search, limit, config }),
});
