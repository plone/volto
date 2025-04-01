import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetCommentsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getCommentsSchema = z.object({
  path: z.string(),
});

export type CommentsArgs = z.infer<typeof getCommentsSchema>;

export async function getComments(
  this: PloneClient,
  { path }: CommentsArgs,
): Promise<RequestResponse<GetCommentsResponse>> {
  const validatedArgs = getCommentsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const commentsPath = `/${validatedArgs.path}/@comments`;

  return apiRequest('get', commentsPath, options);
}
