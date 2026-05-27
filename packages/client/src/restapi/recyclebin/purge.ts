import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { recycleBinIdSchema } from '../../validation/recyclebin';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const purgeRecycleBinItemArgsSchema = z.object({
  id: recycleBinIdSchema,
});

export type PurgeRecycleBinItemArgs = z.infer<
  typeof purgeRecycleBinItemArgsSchema
>;

export async function purgeRecycleBinItem(
  this: PloneClient,
  { id }: PurgeRecycleBinItemArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = purgeRecycleBinItemArgsSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  return apiRequest('delete', `/@recyclebin/${validatedArgs.id}`, options);
}
