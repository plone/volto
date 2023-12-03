import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { WorkflowResponse } from '../../interfaces/workflow';
import { z } from 'zod';

const getWorkflowSchema = z.object({
  path: z.string(),
});

export type WorkflowArgs = z.infer<typeof getWorkflowSchema> & {
  config: PloneClientConfig;
};

export const getWorkflow = async ({
  path,
  config,
}: WorkflowArgs): Promise<WorkflowResponse> => {
  const validatedArgs = getWorkflowSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const workflowPath = `${validatedArgs.path}/@workflow`;

  return apiRequest('get', workflowPath, options);
};

export const getWorkflowQuery = ({ path, config }: WorkflowArgs) => ({
  queryKey: [path, 'get', 'workflow'],
  queryFn: () => getWorkflow({ path, config }),
});
