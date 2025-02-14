import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { createWorkflowDataSchema } from '../../validation/workflow';
import type { CreateWorkflowResponse } from '@plone/types';

export const createWorkflowArgsSchema = z.object({
  path: z.string(),
  data: createWorkflowDataSchema.optional(),
  config: PloneClientConfigSchema,
});

export type CreateWorkflowArgs = z.infer<typeof createWorkflowArgsSchema>;

export const createWorkflow = async ({
  path,
  data,
  config,
}: CreateWorkflowArgs): Promise<CreateWorkflowResponse> => {
  const validatedArgs = createWorkflowArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const workflowPath = `${validatedArgs.path}/@workflow/publish`;

  return apiRequest('post', workflowPath, options);
};

export const createWorkflowMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'workflow'],
  mutationFn: ({ path, data }: Omit<CreateWorkflowArgs, 'config'>) =>
    createWorkflow({ path, data, config }),
});
