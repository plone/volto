import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteCommentArgsSchema = z.object({
  path: z.string(),
  comment_id: z.string(),
});

export type DeleteCommentArgs = z.infer<typeof deleteCommentArgsSchema>;

export async function deleteComment(
  this: PloneClient,
  { path, comment_id }: DeleteCommentArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteCommentArgsSchema.parse({
    path,
    comment_id,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const commentsPath = `${validatedArgs.path}/@comments/${validatedArgs.comment_id}`;

  return apiRequest('delete', commentsPath, options);
}
