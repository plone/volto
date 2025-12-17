import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type { WorkflowResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getWorkflowSchema = z.object({
  path: z.string(),
});

export type WorkflowArgs = z.infer<typeof getWorkflowSchema>;

export async function getWorkflow(
  this: PloneClient,
  { path }: WorkflowArgs,
): Promise<RequestResponse<WorkflowResponse>> {
  const validatedArgs = getWorkflowSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };
  const workflowPath = `${validatedArgs.path}/@workflow`;

  return apiRequest('get', workflowPath, options);
}
