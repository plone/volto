import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const getRegistrySchema = z.object({
  registryName: z.string(),
});

export type GetRegistryArgs = z.infer<typeof getRegistrySchema> & {
  config: PloneClientConfig;
};

export const getRegistry = async ({
  registryName,
  config,
}: GetRegistryArgs): Promise<string> => {
  const validatedArgs = getRegistrySchema.parse({
    registryName,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const registryPath = `/@registry/${validatedArgs.registryName}`;

  return apiRequest('get', registryPath, options);
};

export const getRegistryQuery = ({
  registryName,
  config,
}: GetRegistryArgs) => ({
  queryKey: [registryName, 'get', 'registry'],
  queryFn: () => getRegistry({ registryName, config }),
});
