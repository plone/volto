import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetSearchResponse, getSearchSchema } from '../../interfaces/search';
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
    params: flattenedQuery,
  };

  return apiRequest('get', '/@search', options);
};

export const getSearchQuery = ({ query, config }: SearchArgs) => ({
  queryKey: [query, 'get', 'search'],
  queryFn: () => getSearch({ query, config }),
});
