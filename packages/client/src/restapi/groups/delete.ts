import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteGroupArgsSchema = z.object({
  id: z.string(),
});

type DeleteGroupArgs = z.infer<typeof deleteGroupArgsSchema>;

export async function deleteGroup(
  this: PloneClient,
  { id }: DeleteGroupArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteGroupArgsSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const groupName = `/@groups/${validatedArgs.id}`;

  return apiRequest('delete', groupName, options);
}
