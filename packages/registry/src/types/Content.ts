export type Components =
  | 'actions'
  | 'aliases'
  | 'breadcrumbs'
  | 'contextnavigation'
  | 'navigation'
  | 'types'
  | 'workflow';

export type Item = {
  '@id': string;
  '@type': string;
  description: string;
  image_field: null;
  image_scales: null;
  review_state: string;
  title: string;
};

export type RelatedItem = {
  '@id': string;
  '@type': string;
  UID: string;
  description: string;
  image_field: unknown;
  image_scales: unknown;
  review_state: string;
  title: string;
};

export type ImageScale = {
  download: string;
  height: number;
  width: number;
};

export type PreviewImage = {
  'content-type': string;
  download: string;
  filename: string;
  height: number;
  scales: {
    great: ImageScale;
    huge: ImageScale;
    icon: ImageScale;
    large: ImageScale;
    larger: ImageScale;
    mini: ImageScale;
    preview: ImageScale;
    teaser: ImageScale;
    thumb: ImageScale;
    title: ImageScale;
  };
  size: number;
  width: number;
};

export interface Content {
  '@components': {
    [key in Components]?: {
      [key: string]: unknown;
      items?: unknown[];
    };
  };
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
