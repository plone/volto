import { z } from 'zod';

export interface GetTranslationResponse {
  '@id': string;
  items: Array<{
    '@id': string;
    language: string;
  }>;
  root: RootLanguages;
}

interface RootLanguages {
  [key: string]: string;
}

export const linkTranslationDataSchema = z.object({
  id: z.string(),
});

export const unlinkTranslationDataSchema = z.object({
  language: z.string(),
});
