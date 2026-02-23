import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const deleteControlpanelArgsSchema = z.object({
  path: z.string(),
  data: z.any(),
});

export type DeleteControlpanelArgs = z.infer<
  typeof deleteControlpanelArgsSchema
>;

export async function deleteControlpanel(
  this: PloneClient,
  { path, data }: DeleteControlpanelArgs,
): Promise<RequestResponse<any>> {
  const validatedArgs = deleteControlpanelArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const deleteControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('delete', deleteControlpanelPath, options);
}
