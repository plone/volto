import { apiRequest, type ApiRequestParams } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { z } from 'zod';
import { updateContentDataSchema } from '../../validation/content';
import type { UpdateContentResponse } from '@plone/types';

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
