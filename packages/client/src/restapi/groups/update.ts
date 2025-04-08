import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { updateGroupDataSchema } from '../../validation/groups';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateGroupArgsSchema = z.object({
  groupId: z.string(),
  data: updateGroupDataSchema,
});

export type UpdateGroupArgs = z.infer<typeof updateGroupArgsSchema>;

export async function updateGroup(
  this: PloneClient,
  { groupId, data }: UpdateGroupArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = updateGroupArgsSchema.parse({
    groupId,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const groupName = `/@groups/${validatedArgs.groupId}`;

  return apiRequest('patch', groupName, options);
}
