import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

export const deleteCommentArgsSchema = z.object({
  path: z.string(),
  comment_id: z.string(),
  config: PloneClientConfigSchema,
});

export type DeleteCommentArgs = z.infer<typeof deleteCommentArgsSchema>;

export const deleteComment = async ({
  path,
  comment_id,
  config,
}: DeleteCommentArgs): Promise<undefined> => {
  const validatedArgs = deleteCommentArgsSchema.parse({
    path,
    comment_id,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const commentsPath = `${validatedArgs.path}/@comments/${validatedArgs.comment_id}`;

  return apiRequest('delete', commentsPath, options);
};

export const deleteCommentMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'comments'],
  mutationFn: ({ path, comment_id }: Omit<DeleteCommentArgs, 'config'>) =>
    deleteComment({ path, comment_id, config }),
});
