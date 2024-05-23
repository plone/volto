import type { BreadcrumbsResponse } from '../services/breadcrumbs';
import type { NavigationResponse } from '../services/navigation';
import type { ActionsResponse } from '../services/actions';
import type { GetTypesResponse } from '../services/types';
import type { GetNavrootResponse } from '../services/navroot';
import type { GetAliasesResponse } from '../services/aliases';
import type { ContextNavigationResponse } from '../services/contextnavigation';
import type { WorkflowResponse } from '../services/workflow';

export interface Expanders {
  [key: string]: unknown;
  actions: ActionsResponse;
  aliases: GetAliasesResponse;
  breadcrumbs: BreadcrumbsResponse;
  contextnavigation: ContextNavigationResponse;
  navigation: NavigationResponse;
  navroot: GetNavrootResponse;
  types: GetTypesResponse;
  workflow: WorkflowResponse;
}

export type ContainedItem = {
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
  image_field: '';
  image_scales: Record<string, PreviewImage> | null;
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
