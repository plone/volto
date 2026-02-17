import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { createGroupDataSchema } from '../../validation/groups';
import type { CreateGroupResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createGroupArgsSchema = z.object({
  data: createGroupDataSchema,
});

export type CreateGroupArgs = z.infer<typeof createGroupArgsSchema>;

export async function createGroup(
  this: PloneClient,
  { data }: CreateGroupArgs,
): Promise<RequestResponse<CreateGroupResponse>> {
  const validatedArgs = createGroupArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('post', '/@groups', options);
}
