import { z } from 'zod';
import {
  Expanders,
  Item,
  PreviewImage,
  RelatedItem,
  RelatedItemPayloadSchema,
} from './common';

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

export interface UpdateContentResponse {
  '@components': Expanders;
  '@id': string;
  '@type': string;
  UID: string;
  allow_discussion:
    | boolean
    | {
        title: string;
        token: boolean;
      };
  blocks: {
    [key in string]: {
      '@type': string;
    };
  };
  blocks_layout: {
    [k in string]: {
      items: string[];
    } & Record<string, unknown>;
  };
  contributors: string[];
  created: string;
  creators: string[];
  description: string;
  effective: string | null;
  exclude_from_nav: boolean;
  expires: string | null;
  id: string;
  is_folderish: boolean;
  items: Item[];
  items_total: number;
  language: string;
  layout: string;
  lock: {
    created: string;
    creator: string;
    creator_name: string;
    creator_url: string;
    locked: boolean;
    name: string;
    stealable: boolean;
    time: number;
    timeout: number;
    token: string;
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
  working_copy: unknown;
  working_copy_of: unknown;
}
