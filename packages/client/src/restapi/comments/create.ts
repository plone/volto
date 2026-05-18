import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { createCommentDataSchema } from '../../validation/comments';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createCommentArgsSchema = z.object({
  path: z.string(),
  in_reply_to: z.string().optional(),
  data: createCommentDataSchema,
});

export type CreateCommentArgs = z.infer<typeof createCommentArgsSchema>;

export async function createComment(
  this: PloneClient,
  { path, in_reply_to, data }: CreateCommentArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = createCommentArgsSchema.parse({
    path,
    in_reply_to,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const commentsPath = in_reply_to
    ? `/${validatedArgs.path}/@comments/${validatedArgs.in_reply_to}`
    : `/${validatedArgs.path}/@comments`;

  return apiRequest('post', commentsPath, options);
}
