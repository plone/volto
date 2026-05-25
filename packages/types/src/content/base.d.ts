import type { Expanders, ContainedItem, Image, RelatedItem } from './common';
import type { BlocksFormData } from '../blocks';

/**
 * Base interface containing all fields common to every Plone content type.
 *
 * Use `ContentBase` when you need a generic content object without narrowing by
 * `@type` (e.g. when implementing shared components that work with any type).
 *
 * Use `Content` (the discriminated union) when you want TypeScript to
 * automatically narrow based on the `@type` field.
 */
export interface ContentBase {
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
  blocks: Record<string, BlocksFormData>;
  blocks_layout: {
    items: string[];
  };
  contributors: string[];
  creators: string[];
  description: string;
  effective: string | null;
  exclude_from_nav: boolean;
  expires: string | null;
  id: string;
  is_folderish: boolean;
  image?: Image | null;
  items: ContainedItem[];
  items_total: number;
  language: unknown;
  layout: string | null;
  lock:
    | {
        locked: boolean;
        stealable: boolean;
      }
    | {
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
  preview_image?: Image | null;
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
  table_of_contents: boolean | null;
  title: string;
  type_title: string | null;
  version: number | null;
  versioning_enabled: boolean | null;
  working_copy: unknown;
  working_copy_of: unknown;
}
