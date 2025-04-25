import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetTranslationResponse } from '@plone/types';
import { z } from 'zod';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getTranslationSchema = z.object({
  path: z.string(),
});

export type TranslationArgs = z.infer<typeof getTranslationSchema>;

export async function getTranslation(
  this: PloneClient,
  { path }: TranslationArgs,
): Promise<RequestResponse<GetTranslationResponse>> {
  const validatedArgs = getTranslationSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  const translationsPath = `${validatedArgs.path}/@translations`;

  return apiRequest('get', translationsPath, options);
}
