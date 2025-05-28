import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { copyMoveContentDataSchema as moveContentDataSchema } from '../../validation/content';
import type { CopyMoveContentResponse as MoveContentResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export type MoveArgs = z.infer<typeof moveContentDataSchema>;

export async function moveContent(
  this: PloneClient,
  { path, data }: MoveArgs,
): Promise<RequestResponse<MoveContentResponse>> {
  const validatedArgs = moveContentDataSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    config: this.config,
    data: validatedArgs.data,
  };

  const movePath = `${validatedArgs.path}/@move`;

  return apiRequest('post', movePath, options);
}
