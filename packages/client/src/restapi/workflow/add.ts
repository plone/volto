import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  createWorkflowDataSchema,
  CreateWorkflowResponse,
} from '../../interfaces/workflow';

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
