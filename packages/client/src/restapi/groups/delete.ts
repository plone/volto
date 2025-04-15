import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteGroupArgsSchema = z.object({
  groupId: z.string(),
});

type DeleteGroupArgs = z.infer<typeof deleteGroupArgsSchema>;

export async function deleteGroup(
  this: PloneClient,
  { groupId }: DeleteGroupArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = deleteGroupArgsSchema.parse({
    groupId,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const groupName = `/@groups/${validatedArgs.groupId}`;

  return apiRequest('delete', groupName, options);
}
