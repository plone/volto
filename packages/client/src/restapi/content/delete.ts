import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const deleteContentArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

type DeleteContentArgs = z.infer<typeof deleteContentArgsSchema>;

export const deleteContent = async ({
  path,
  config,
}: DeleteContentArgs): Promise<undefined> => {
  const validatedArgs = deleteContentArgsSchema.parse({
    path,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };
  return apiRequest('delete', validatedArgs.path, options);
};

export const deleteContentMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'content'],
  mutationFn: ({ path }: Omit<DeleteContentArgs, 'config'>) =>
    deleteContent({ path, config }),
});
