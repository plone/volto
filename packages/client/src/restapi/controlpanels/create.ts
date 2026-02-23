import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const createControlpanelArgsSchema = z.object({
  path: z.string(),
  data: z.any(),
});

export type CreateControlpanelArgs = z.infer<
  typeof createControlpanelArgsSchema
>;

export async function createControlpanel(
  this: PloneClient,
  { path, data }: CreateControlpanelArgs,
): Promise<RequestResponse<any>> {
  const validatedArgs = createControlpanelArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const createControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('post', createControlpanelPath, options);
}
