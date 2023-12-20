import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetTranslationResponse } from '../../interfaces/translations';
import { z } from 'zod';

const getTranslationSchema = z.object({
  path: z.string(),
});

export type TranslationArgs = z.infer<typeof getTranslationSchema> & {
  config: PloneClientConfig;
};

export const getTranslation = async ({
  path,
  config,
}: TranslationArgs): Promise<GetTranslationResponse> => {
  const validatedArgs = getTranslationSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const translationsPath = `${validatedArgs.path}/@translations`;

  return apiRequest('get', translationsPath, options);
};

export const getTranslationQuery = ({ path, config }: TranslationArgs) => ({
  queryKey: [path, 'get', 'content'],
  queryFn: () => getTranslation({ path, config }),
});
