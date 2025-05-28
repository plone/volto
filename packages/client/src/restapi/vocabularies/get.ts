import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetVocabularyResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getVocabularySchema = z.object({
  path: z.string(),
  title: z.string().optional(),
  token: z.string().optional(),
  tokens: z.array(z.string()).optional(),
});

export type VocabulariesArgs = z.infer<typeof getVocabularySchema>;

export async function getVocabulary(
  this: PloneClient,
  { path, title, token, tokens }: VocabulariesArgs,
): Promise<RequestResponse<GetVocabularyResponse>> {
  const validatedArgs = getVocabularySchema.parse({
    path,
    title,
    token,
    tokens,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {
      ...(validatedArgs.title && { title: validatedArgs.title }),
      ...(validatedArgs.token && { token: validatedArgs.token }),
      ...(validatedArgs.tokens && { tokens: validatedArgs.tokens }),
    },
  };
  const vocabulariesPath = `@vocabularies/${validatedArgs.path}`;

  return apiRequest('get', vocabulariesPath, options);
}
