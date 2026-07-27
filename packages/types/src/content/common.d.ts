import type { BreadcrumbsResponse } from '../services/breadcrumbs';
import type { NavigationResponse } from '../services/navigation';
import type { ActionsResponse } from '../services/actions';
import type { GetTypesResponse } from '../services/types';
import type { GetNavrootResponse } from '../services/navroot';
import type { GetSiteResponse } from '../services/site';
import type { GetAliasesResponse } from '../services/aliases';
import type { ContextNavigationResponse } from '../services/contextnavigation';
import type { WorkflowResponse } from '../services/workflow';
import type { GetTranslationResponse } from '../services/translations';

export interface Expanders {
  [key: string]: unknown;
  actions: ActionsResponse;
  aliases: GetAliasesResponse;
  breadcrumbs: BreadcrumbsResponse;
  contextnavigation: ContextNavigationResponse;
  navigation: NavigationResponse;
  navroot: GetNavrootResponse;
  site?: GetSiteResponse;
  translations?: GetTranslationResponse;
  types: GetTypesResponse;
  workflow: WorkflowResponse;
}

export interface ContainedItem {
  '@id': string;
  '@type': string;
  description: string;
  image_field: string;
  image_scales: Record<string, Image> | null;
  review_state: string | null;
  title: string;
}

export interface RelatedItem {
  '@id': string;
  '@type': string;
  UID: string;
  description: string;
  image_field: string;
  image_scales: Record<string, Image> | null;
  review_state: string;
  title: string;
}

export type ImageScale = {
  download: string;
  height: number;
  width: number;
};

export type Image = {
  'content-type': string;
  download: string;
  filename: string;
  height: number;
  scales: Partial<{
    [key: string]: ImageScale;
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
  }>;
  size: number;
  width: number;
};
