import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { copyMoveContentDataSchema as copyContentDataSchema } from '../../validation/content';
import type { CopyMoveContentResponse as CopyContentResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export type CopyArgs = z.infer<typeof copyContentDataSchema>;

export async function copyContent(
  this: PloneClient,
  { path, data }: CopyArgs,
): Promise<RequestResponse<CopyContentResponse>> {
  const validatedArgs = copyContentDataSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    config: this.config,
    data: validatedArgs.data,
  };

  const copyPath = `${validatedArgs.path}/@copy`;

  return apiRequest('post', copyPath, options);
}
