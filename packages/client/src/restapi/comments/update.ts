import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { newCommentDataSchema as updateCommentDataSchema } from '../../validation/comments';

export const updateCommentArgsSchema = z.object({
  path: z.string(),
  comment_id: z.string(),
  data: updateCommentDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateCommentArgs = z.infer<typeof updateCommentArgsSchema>;

export const updateComment = async ({
  path,
  comment_id,
  data,
  config,
}: UpdateCommentArgs): Promise<undefined> => {
  const validatedArgs = updateCommentArgsSchema.parse({
    path,
    comment_id,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const commentsPath = `${validatedArgs.path}/@comments/${validatedArgs.comment_id}`;

  return apiRequest('patch', commentsPath, options);
};

export const updateCommentMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'comments'],
  mutationFn: ({ path, comment_id, data }: Omit<UpdateCommentArgs, 'config'>) =>
    updateComment({ path, comment_id, data, config }),
});
