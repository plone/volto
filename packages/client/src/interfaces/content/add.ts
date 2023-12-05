import { z } from 'zod';
import { RelatedItemPayloadSchema } from './common';

export const createContentDataSchema = z.object({
  '@id': z.string().optional(),
  '@static_behaviors': z.unknown().optional(),
  '@type': z.string(),
  allow_discussion: z.boolean().optional(),
  blocks: z.unknown().optional(),
  blocks_layout: z.array(z.string()).optional(),
  contributors: z.array(z.string()).optional(),
  creators: z.array(z.string()).optional(),
  description: z.string().optional(),
  effective: z.string().nullable().optional(),
  exclude_from_nav: z.boolean().optional(),
  expires: z.string().nullable().optional(),
  id: z.string().optional(),
  language: z.string().optional(),
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
  rights: z.string().nullable().optional(),
  title: z.string(),
  versioning_enabled: z.boolean().optional(),
});
