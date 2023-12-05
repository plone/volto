import type { BreadcrumbsResponse } from '../breadcrumbs';
import type { NavigationResponse } from '../navigation';
import type { ActionsResponse } from '../actions';
import type { GetTypesResponse } from '../types';

export interface Expanders {
  [key: string]: unknown;
  actions: ActionsResponse;
  breadcrumbs: BreadcrumbsResponse;
  navigation: NavigationResponse;
  types: GetTypesResponse;
}

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
