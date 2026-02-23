import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { createWorkflowDataSchema } from '../../validation/workflow';
import type { CreateWorkflowResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createWorkflowArgsSchema = z.object({
  path: z.string(),
  data: createWorkflowDataSchema.optional(),
});

export type CreateWorkflowArgs = z.infer<typeof createWorkflowArgsSchema>;

export async function createWorkflow(
  this: PloneClient,
  { path, data }: CreateWorkflowArgs,
): Promise<RequestResponse<CreateWorkflowResponse>> {
  const validatedArgs = createWorkflowArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const workflowPath = `${validatedArgs.path}/@workflow/publish`;

  return apiRequest('post', workflowPath, options);
}
