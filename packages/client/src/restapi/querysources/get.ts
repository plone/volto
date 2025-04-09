import { apiRequest, type ApiRequestParams } from '../../api';
import { z } from 'zod';
import type { GetQuerysourcesResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getQuerysourcesSchema = z.object({
  path: z.string(),
  field: z.string(),
  query: z.string(),
});

export type QuerysourcesArgs = z.infer<typeof getQuerysourcesSchema>;

export async function getQuerysources(
  this: PloneClient,
  { path, field, query }: QuerysourcesArgs,
): Promise<RequestResponse<GetQuerysourcesResponse>> {
  const validatedArgs = getQuerysourcesSchema.parse({
    path,
    field,
    query,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {
      ...(validatedArgs.query && { query: validatedArgs.query }),
    },
  };

  const querysourcePath = `/${validatedArgs.path}/@querysources/${field}`;

  return apiRequest('get', querysourcePath, options);
}
