import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetGroupResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getGroupSchema = z.object({
  id: z.string(),
});

export type GroupArgs = z.infer<typeof getGroupSchema>;

export async function getGroup(
  this: PloneClient,
  { id }: GroupArgs,
): Promise<RequestResponse<GetGroupResponse>> {
  const validatedArgs = getGroupSchema.parse({
    id,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const groupName = `@groups/${validatedArgs.id}`;

  return apiRequest('get', groupName, options);
}
