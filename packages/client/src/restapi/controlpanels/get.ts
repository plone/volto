import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetControlpanelResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getControlpanelSchema = z.object({
  path: z.string(),
});

export type ControlpanelArgs = z.infer<typeof getControlpanelSchema>;

export async function getControlpanel(
  this: PloneClient,
  { path }: ControlpanelArgs,
): Promise<RequestResponse<GetControlpanelResponse>> {
  const validatedArgs = getControlpanelSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const getControlpanelPath = `@controlpanels/${validatedArgs.path}`;

  return apiRequest('get', getControlpanelPath, options);
}
