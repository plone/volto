import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetPrincipalsResponse } from '../../interfaces/principals';

const getPrincipalsSchema = z.object({
  search: z.string(),
});

export type PrincipalsArgs = z.infer<typeof getPrincipalsSchema> & {
  config: PloneClientConfig;
};

export const getPrincipals = async ({
  search,
  config,
}: PrincipalsArgs): Promise<GetPrincipalsResponse> => {
  const validatedArgs = getPrincipalsSchema.parse({
    search,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const principalsPath = `/@principals?search=${validatedArgs.search}`;

  return apiRequest('get', principalsPath, options);
};

export const getPrincipalsQuery = ({ search, config }: PrincipalsArgs) => ({
  queryKey: [search, 'get', 'principals'],
  queryFn: () => getPrincipals({ search, config }),
});
