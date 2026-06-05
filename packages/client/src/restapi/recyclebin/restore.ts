import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import {
  recycleBinIdSchema,
  restoreRecycleBinItemDataSchema,
} from '../../validation/recyclebin';
import type { RestoreRecycleBinItemResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const restoreRecycleBinItemArgsSchema = z.object({
  id: recycleBinIdSchema,
  data: restoreRecycleBinItemDataSchema,
});

export type RestoreRecycleBinItemArgs = z.infer<
  typeof restoreRecycleBinItemArgsSchema
>;

export async function restoreRecycleBinItem(
  this: PloneClient,
  { id, data = {} }: RestoreRecycleBinItemArgs,
): Promise<RequestResponse<RestoreRecycleBinItemResponse>> {
  const validatedArgs = restoreRecycleBinItemArgsSchema.parse({
    id,
    data,
  });

  const options: ApiRequestParams = {
    config: this.config,
    data: validatedArgs.data,
  };

  return apiRequest(
    'post',
    `/@recyclebin/${validatedArgs.id}/restore`,
    options,
  );
}
