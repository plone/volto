import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import { linkTranslationDataSchema } from '../../validation/translations';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const linkTranslationArgsSchema = z.object({
  path: z.string(),
  data: linkTranslationDataSchema,
});

export type LinkTranslationArgs = z.infer<typeof linkTranslationArgsSchema>;

export async function linkTranslation(
  this: PloneClient,
  { path, data }: LinkTranslationArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = linkTranslationArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const translationsPath = `${validatedArgs.path}/@translations`;

  return apiRequest('post', translationsPath, options);
}
