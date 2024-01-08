import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { newCommentDataSchema as createCommentDataSchema } from '../../validation/comments';

export const createCommentArgsSchema = z.object({
  path: z.string(),
  reply_id: z.string().optional(),
  data: createCommentDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateCommentArgs = z.infer<typeof createCommentArgsSchema>;

export const createComment = async ({
  path,
  reply_id,
  data,
  config,
}: CreateCommentArgs): Promise<undefined> => {
  const validatedArgs = createCommentArgsSchema.parse({
    path,
    reply_id,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const commentsPath = reply_id
    ? `/${validatedArgs.path}/@comments/${validatedArgs.reply_id}`
    : `/${validatedArgs.path}/@comments`;

  return apiRequest('post', commentsPath, options);
};

export const createCommentMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'comments'],
  mutationFn: ({ path, reply_id, data }: Omit<CreateCommentArgs, 'config'>) =>
    createComment({ path, reply_id, data, config }),
});
