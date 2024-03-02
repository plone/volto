import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { updateTypeFieldDataSchema } from '../../validation/types';

export const updateTypeFieldArgsSchema = z.object({
  contentPath: z.string(),
  data: updateTypeFieldDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateTypeFieldArgs = z.infer<typeof updateTypeFieldArgsSchema>;

export const updateTypeField = async ({
  contentPath,
  data,
  config,
}: UpdateTypeFieldArgs): Promise<undefined> => {
  const validatedArgs = updateTypeFieldArgsSchema.parse({
    contentPath,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateTypeFieldPath = `/@types/${validatedArgs.contentPath}`;

  return apiRequest('patch', updateTypeFieldPath, options);
};

export const updateTypeFieldMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'types'],
  mutationFn: ({ contentPath, data }: Omit<UpdateTypeFieldArgs, 'config'>) =>
    updateTypeField({ contentPath, data, config }),
});
