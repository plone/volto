import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const updateControlpanelArgsSchema = z.object({
  path: z.string(),
  data: z.any(),
});

export type UpdateControlpanelArgs = z.infer<
  typeof updateControlpanelArgsSchema
>;

export async function updateControlpanel(
  this: PloneClient,
  { path, data }: UpdateControlpanelArgs,
): Promise<RequestResponse<any>> {
  const validatedArgs = updateControlpanelArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const updateControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('patch', updateControlpanelPath, options);
}
