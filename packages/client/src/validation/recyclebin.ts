import { z } from 'zod';

const numberOrNumericString = z.union([z.number(), z.string().regex(/^\d+$/)]);

export const recycleBinQuerySchema = z
  .object({
    title: z.string().optional(),
    path: z.string().optional(),
    portal_type: z.string().optional(),
    date_from: z.string().optional(),
    date_to: z.string().optional(),
    deleted_by: z.string().optional(),
    has_subitems: z.boolean().optional(),
    language: z.string().optional(),
    review_state: z.string().optional(),
    sort_on: z
      .enum(['title', 'portal_type', 'path', 'deletion_date', 'review_state'])
      .optional(),
    sort_order: z.enum(['ascending', 'descending']).optional(),
    b_start: numberOrNumericString.optional(),
    b_size: numberOrNumericString.optional(),
  })
  .optional()
  .default({});

export const recycleBinIdSchema = z.string().min(1);

export const restoreRecycleBinItemDataSchema = z
  .object({
    target_path: z.string().optional(),
    restore_id: z.string().optional(),
  })
  .optional()
  .default({});
