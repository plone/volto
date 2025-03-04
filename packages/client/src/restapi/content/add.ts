import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  createContentDataSchema,
  CreateContentResponse,
} from '../../interfaces/content/add';

export const createContentArgsSchema = z.object({
  path: z.string(),
  data: createContentDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateContentArgs = z.infer<typeof createContentArgsSchema>;

export const createContent = async ({
  path,
  data,
  config,
}: CreateContentArgs): Promise<CreateContentResponse> => {
  const validatedArgs = createContentArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };
  return apiRequest('post', validatedArgs.path, options);
};

export const createContentMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'content'],
  mutationFn: ({ path, data }: Omit<CreateContentArgs, 'config'>) =>
    createContent({ path, data, config }),
});
