import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { createTypeFieldDataSchema } from '../../validation/types';
import { CreateTypeFieldResponse } from '@plone/types';

export const createTypeFieldArgsSchema = z.object({
  contentPath: z.string(),
  data: createTypeFieldDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateTypeFieldArgs = z.infer<typeof createTypeFieldArgsSchema>;

export const createTypeField = async ({
  contentPath,
  data,
  config,
}: CreateTypeFieldArgs): Promise<CreateTypeFieldResponse> => {
  const validatedArgs = createTypeFieldArgsSchema.parse({
    contentPath,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };
  const addTypeFieldPath = `/@types/${validatedArgs.contentPath}`;

  return apiRequest('post', addTypeFieldPath, options);
};

export const createTypeFieldMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'types'],
  mutationFn: ({ contentPath, data }: Omit<CreateTypeFieldArgs, 'config'>) =>
    createTypeField({ contentPath, data, config }),
});
