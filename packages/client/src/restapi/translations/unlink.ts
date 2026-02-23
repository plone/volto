import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../api';
import { unlinkTranslationDataSchema } from '../../validation/translations';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export const unlinkTranslationArgsSchema = z.object({
  path: z.string(),
  data: unlinkTranslationDataSchema,
});

export type UnlinkTranslationArgs = z.infer<typeof unlinkTranslationArgsSchema>;

export async function unlinkTranslation(
  this: PloneClient,
  { path, data }: UnlinkTranslationArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = unlinkTranslationArgsSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const translationsPath = `${validatedArgs.path}/@translations`;

  return apiRequest('delete', translationsPath, options);
}
