import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetNavrootResponse } from '@plone/types';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getNavrootSchema = z.object({
  path: z.string(),
  language: z.string().optional(),
});

export type NavrootArgs = z.infer<typeof getNavrootSchema>;

export async function getNavroot(
  this: PloneClient,
  { path, language }: NavrootArgs,
): Promise<RequestResponse<GetNavrootResponse>> {
  const validatedArgs = getNavrootSchema.parse({
    path,
    language,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const navrootPath = language
    ? `/${validatedArgs.language}/${validatedArgs.path}/@navroot`
    : `/${validatedArgs.path}/@navroot`;

  return apiRequest('get', navrootPath, options);
}
