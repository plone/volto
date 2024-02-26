import { z } from 'zod';

const RelationDataSchema = z.object({
  relation: z.string(),
  source: z.string(),
  target: z.string(),
});

export const createRelationsDataSchema = z.object({
  items: z.array(RelationDataSchema),
});

export const deleteRelationsDataSchema = z.object({
  items: z.array(RelationDataSchema).optional(),
  relation: z.string().optional(),
  source: z.string().optional(),
  target: z.string().optional(),
});

export const fixRelationsDataSchema = z.object({
  flush: z.number().optional(),
});
