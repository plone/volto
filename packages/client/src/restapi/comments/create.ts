import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { createCommentDataSchema } from '../../validation/comments';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createCommentArgsSchema = z.object({
  path: z.string(),
  reply_id: z.string().optional(),
  data: createCommentDataSchema,
});

export type CreateCommentArgs = z.infer<typeof createCommentArgsSchema>;

export async function createComment(
  this: PloneClient,
  { path, reply_id, data }: CreateCommentArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = createCommentArgsSchema.parse({
    path,
    reply_id,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const commentsPath = reply_id
    ? `/${validatedArgs.path}/@comments/${validatedArgs.reply_id}`
    : `/${validatedArgs.path}/@comments`;

  return apiRequest('post', commentsPath, options);
}
