import { apiRequest, type ApiRequestParams } from '../../api';
import type { Content } from '@plone/types';
import type PloneClient from '../../client';
import { z } from 'zod';
import type { RequestResponse } from '../types';

const getContentArgsSchema = z.object({
  path: z.string(),
  version: z.string().optional(),
  page: z.number().optional(),
  fullObjects: z.boolean().optional(),
  expand: z.string().array().optional(),
});

type GetContentArgs = z.infer<typeof getContentArgsSchema>;

export async function getContent(
  this: PloneClient,
  { path, version, page, fullObjects, expand }: GetContentArgs,
): Promise<RequestResponse<Content>> {
  const validatedArgs = getContentArgsSchema.parse({
    path,
    version,
    page,
    fullObjects,
    expand,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {
      ...(validatedArgs.page && { page: validatedArgs.page }),
      ...(validatedArgs.version && { version: validatedArgs.version }),
      ...(validatedArgs.fullObjects && {
        fullobjects: validatedArgs.fullObjects,
      }),
    },
  };
  if (validatedArgs.version) {
    return apiRequest(
      'get',
      `${path}/@history/${validatedArgs.version}`,
      options,
    );
  }
  if (validatedArgs.expand) {
    options.params = {
      ...options.params,
      expand,
    };
  }
  return apiRequest('get', path, options);
}
