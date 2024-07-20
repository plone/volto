import type { Expanders, ContainedItem, Image, RelatedItem } from './common';

export interface Content {
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
    [k in string]: {
      '@id': string;
      '@type': string;
    } & Record<string, unknown>;
  };
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

export interface CreateContentResponse extends Content {}
export interface UpdateContentResponse extends Content {}
export * from './common';
