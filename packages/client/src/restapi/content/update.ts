import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { z } from 'zod';
import {
  updateContentDataSchema,
  UpdateContentResponse,
} from '../../interfaces/content/update';

export const updateContentArgsSchema = z.object({
  path: z.string(),
  data: updateContentDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateContentArgs = z.infer<typeof updateContentArgsSchema>;

export const updateContent = async ({
  path,
  data,
  config,
}: UpdateContentArgs): Promise<UpdateContentResponse> => {
  const validatedArgs = updateContentArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };
  return apiRequest('patch', validatedArgs.path, options);
};

export const updateContentMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'content'],
  mutationFn: ({ path, data }: Omit<UpdateContentArgs, 'config'>) =>
    updateContent({ path, data, config }),
});
