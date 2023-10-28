import { Expanders, Item, PreviewImage, RelatedItem } from './common';

export interface GetContentResponse {
  '@components': Expanders;
  '@id': string;
  '@type': string;
  UID: string;
  allow_discussion: boolean;
  blocks: {
    [k in string]: {
      '@id': string;
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
  items: Item[];
  items_total: number;
  language: unknown;
  layout: string | null;
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
  table_of_contents: boolean | null;
  title: string;
  type_tile: string | null;
  version: number | null;
  versioning_enabled: boolean | null;
  working_copy: unknown;
  working_copy_of: unknown;
}
