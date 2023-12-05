import { z } from 'zod';
import { RelatedItemPayloadSchema } from './common';

export const updateContentDataSchema = z.object({
  allow_discussion: z.boolean().optional(),
  blocks: z.unknown().optional(),
  blocks_layout: z.array(z.string()).optional(),
  contributors: z.array(z.string()).optional(),
  creators: z.array(z.string()).optional(),
  description: z.string().optional(),
  effective: z.string().nullable().optional(),
  exclude_from_nav: z.boolean().optional(),
  expires: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  preview_caption: z.string().optional(),
  preview_image: z
    .object({
      'content-type': z.string(),
      data: z.string(),
      encoding: z.string(),
      filename: z.string(),
    })
    .optional(),
  relatedItems: z.array(RelatedItemPayloadSchema).optional(),
  rights: z.string().optional(),
  table_of_contents: z.boolean().nullable().optional(),
  title: z.string().optional(),
  versioning_enabled: z.boolean().optional(),
});
