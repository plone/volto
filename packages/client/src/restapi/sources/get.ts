import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetSourceResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getSourceSchema = z.object({
  path: z.string(),
  field: z.string(),
});

export type SourceArgs = z.infer<typeof getSourceSchema>;

export async function getSource(
  this: PloneClient,
  { path, field }: SourceArgs,
): Promise<RequestResponse<GetSourceResponse>> {
  const validatedArgs = getSourceSchema.parse({
    path,
    field,
  });

  const options: ApiRequestParams = {
    config: this.config,
  };

  const sourcePath = `/${validatedArgs.path}/@sources/${field}`;

  return apiRequest('get', sourcePath, options);
}
