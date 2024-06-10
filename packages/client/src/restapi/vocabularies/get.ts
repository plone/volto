import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../validation/config';
import { GetVocabulariesResponse } from '@plone/types';
import { z } from 'zod';

const getVocabulariesSchema = z.object({
  path: z.string(),
  title: z.string().optional(),
  token: z.string().optional(),
  locale: z.string().optional(),
  tokens: z.array(z.string()).optional(),
});

export type VocabulariesArgs = z.infer<typeof getVocabulariesSchema> & {
  config: PloneClientConfig;
};

export const getVocabularies = async ({
  path,
  title,
  token,
  locale,
  tokens,
  config,
}: VocabulariesArgs): Promise<GetVocabulariesResponse> => {
  const validatedArgs = getVocabulariesSchema.parse({
    path,
    title,
    locale,
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
  const vocabulariesPath = `${locale ? `${locale}/` : ''}@vocabularies/${
    validatedArgs.path
  }`;

  return apiRequest('get', vocabulariesPath, options);
};

export const getVocabulariesQuery = ({
  path,
  title,
  token,
  locale,
  tokens,
  config,
}: VocabulariesArgs) => ({
  queryKey: [locale, path, title, token, tokens, 'get', 'vocabularies'],
  queryFn: () =>
    getVocabularies({ path, title, token, tokens, config, locale }),
});
