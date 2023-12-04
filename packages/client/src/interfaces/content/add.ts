import { z } from 'zod';
import {
  Expanders,
  Item,
  PreviewImage,
  RelatedItem,
  RelatedItemPayloadSchema,
} from './common';

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

export interface CreateContentResponse {
  '@components': Expanders;
  '@id': string;
  '@type': string;
  UID: string;
  allow_discussion: boolean;
  blocks: unknown;
  blocks_layout: {
    [k in string]: {
      items: string[];
    } & Record<string, unknown>;
  };
  contributors: string[];
  creators: string[];
  description: string;
  effective: string | null;
  exclude_from_nav: boolean;
  expires: string | null;
  id: string;
  is_folderish: boolean;
  items: Item[];
  items_total: number;
  language: {
    title: string;
    token: string;
  };
  layout: string;
  lock: {
    locked: boolean;
    stealable: boolean;
  };
  modified: string;
  next_item: {
    '@id': string;
    '@type': string;
    description: string;
    title: string;
  };
  parent: {
    '@id': string;
    '@type': string;
    description: string;
    title: string;
  };
  preview_caption: string | null;
  preview_image: PreviewImage;
  previous_item: {
    '@id': string;
    '@type': string;
    description: string;
    title: string;
  };
  relatedItems: RelatedItem[];
  review_state: string | null;
  rights: string;
  subjects: [];
  title: string;
  version: string;
  versioning_enabled: boolean | null;
  working_copy: unknown;
  working_copy_of: unknown;
}
