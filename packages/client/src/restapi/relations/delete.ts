import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { deleteRelationsDataSchema } from '../../validation/relations';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteRelationsArgsSchema = z.object({
  data: deleteRelationsDataSchema,
});

export type DeleteRelationsArgs = z.infer<typeof deleteRelationsArgsSchema>;

export async function deleteRelations(
  this: PloneClient,
  { data }: DeleteRelationsArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteRelationsArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('delete', '/@relations', options);
}
