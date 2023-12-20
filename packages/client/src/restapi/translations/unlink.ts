import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { unlinkTranslationDataSchema } from '../../validation/translations';

export const unlinkTranslationArgsSchema = z.object({
  path: z.string(),
  data: unlinkTranslationDataSchema,
  config: PloneClientConfigSchema,
});

export type UnlinkTranslationArgs = z.infer<typeof unlinkTranslationArgsSchema>;

export const unlinkTranslation = async ({
  path,
  data,
  config,
}: UnlinkTranslationArgs): Promise<undefined> => {
  const validatedArgs = unlinkTranslationArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const translationsPath = `${validatedArgs.path}/@translations`;

  return apiRequest('delete', translationsPath, options);
};

export const unlinkTranslationMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'translations'],
  mutationFn: ({ path, data }: Omit<UnlinkTranslationArgs, 'config'>) =>
    unlinkTranslation({ path, data, config }),
});
