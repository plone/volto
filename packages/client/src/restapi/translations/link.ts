import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { linkTranslationDataSchema } from '../../interfaces/translations';

export const linkTranslationArgsSchema = z.object({
  path: z.string(),
  data: linkTranslationDataSchema,
  config: PloneClientConfigSchema,
});

export type LinkTranslationArgs = z.infer<typeof linkTranslationArgsSchema>;

export const linkTranslation = async ({
  path,
  data,
  config,
}: LinkTranslationArgs): Promise<undefined> => {
  const validatedArgs = linkTranslationArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const translationsPath = `${validatedArgs.path}/@translations`;

  return apiRequest('post', translationsPath, options);
};

export const linkTranslationMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'translations'],
  mutationFn: ({ path, data }: Omit<LinkTranslationArgs, 'config'>) =>
    linkTranslation({ path, data, config }),
});
