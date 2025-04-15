import { apiRequest, type ApiRequestParams } from '../../api';
import type { BreadcrumbsResponse } from '@plone/types';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getBreadcrumbsSchema = z.object({
  path: z.string(),
});

export type BreadcrumbsArgs = z.infer<typeof getBreadcrumbsSchema>;

export async function getBreadcrumbs(
  this: PloneClient,
  { path }: BreadcrumbsArgs,
): Promise<RequestResponse<BreadcrumbsResponse>> {
  const validatedArgs = getBreadcrumbsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const breadcrumbsPath = `${validatedArgs.path}/@breadcrumbs`;

  return apiRequest('get', breadcrumbsPath, options);
}
