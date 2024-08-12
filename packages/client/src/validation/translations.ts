import { z } from 'zod';

export const linkTranslationDataSchema = z.object({
  id: z.string(),
});

export const unlinkTranslationDataSchema = z.object({
  language: z.string(),
});
