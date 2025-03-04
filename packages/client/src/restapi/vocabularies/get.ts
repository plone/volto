import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetVocabulariesResponse } from '@plone/types';

const getVocabulariesSchema = z.object({
  path: z.string(),
  title: z.string().optional(),
  token: z.string().optional(),
  tokens: z.array(z.string()).optional(),
});

export type VocabulariesArgs = z.infer<typeof getVocabulariesSchema> & {
  config: PloneClientConfig;
};

export const getVocabularies = async ({
  path,
  title,
  token,
  tokens,
  config,
}: VocabulariesArgs): Promise<GetVocabulariesResponse> => {
  const validatedArgs = getVocabulariesSchema.parse({
    path,
    title,
    token,
    tokens,
  });

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs.title && { title: validatedArgs.title }),
      ...(validatedArgs.token && { token: validatedArgs.token }),
      ...(validatedArgs.tokens && { tokens: validatedArgs.tokens }),
    },
  };
  const vocabulariesPath = `@vocabularies/${validatedArgs.path}`;

  return apiRequest('get', vocabulariesPath, options);
};

export const getVocabulariesQuery = ({
  path,
  title,
  token,
  tokens,
  config,
}: VocabulariesArgs) => ({
  queryKey: [path, title, token, tokens, 'get', 'vocabularies'],
  queryFn: () => getVocabularies({ path, title, token, tokens, config }),
});
