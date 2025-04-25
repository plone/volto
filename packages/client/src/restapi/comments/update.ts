import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { createCommentDataSchema as updateCommentDataSchema } from '../../validation/comments';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateCommentArgsSchema = z.object({
  path: z.string(),
  comment_id: z.string(),
  data: updateCommentDataSchema,
});

export type UpdateCommentArgs = z.infer<typeof updateCommentArgsSchema>;

export async function updateComment(
  this: PloneClient,
  { path, comment_id, data }: UpdateCommentArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updateCommentArgsSchema.parse({
    path,
    comment_id,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const commentsPath = `${validatedArgs.path}/@comments/${validatedArgs.comment_id}`;

  return apiRequest('patch', commentsPath, options);
}
