import { z } from 'zod';

const itemSchema = z.object({
  path: z.string(),
});

export const createAliasesDataSchema = z.object({
  items: z.array(itemSchema),
});

export const deleteAliasesDataSchema = z.object({
  items: z.array(itemSchema),
});

const rootItemSchema = z.object({
  datetime: z.string().optional(),
  path: z.string(),
  'redirect-to': z.string(),
});

export const createAliasesMultipleDataSchema = z.object({
  items: z.array(rootItemSchema),
});
