import { z } from 'zod';
import { BreadcrumbsResponse } from '../breadcrumbs';
import { NavigationResponse } from '../navigation';
import { ActionsResponse } from '../actions';
import { GetAliasesResponse } from '../aliases';
import { ContextNavigationResponse } from '../contextnavigation';
import { GetTypesResponse } from '../types';
import { WorkflowResponse } from '../workflow';

export interface Expanders {
  [key: string]: unknown;
  actions: ActionsResponse;
  aliases: GetAliasesResponse;
  breadcrumbs: BreadcrumbsResponse;
  contextnavigation: ContextNavigationResponse;
  navigation: NavigationResponse;
  types: GetTypesResponse;
  workflow: WorkflowResponse;
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

export const RelatedItemPayloadSchema = z.object({
  '@id': z.string(),
  '@type': z.string(),
  CreationDate: z.string(),
  Creator: z.string(),
  Date: z.string(),
  Description: z.string(),
  EffectiveDate: z.unknown(),
  ExpirationDate: z.unknown(),
  ModificationDate: z.string(),
  Subject: z.array(z.unknown()),
  Title: z.string(),
  Type: z.string(),
  UID: z.string(),
  author_name: z.unknown(),
  cmf_uid: z.unknown(),
  commentators: z.array(z.unknown()),
  created: z.string(),
  description: z.string(),
  effective: z.string(),
  end: z.unknown(),
  exclude_from_nav: z.boolean(),
  expires: z.string(),
  getIcon: z.unknown(),
  getId: z.string(),
  getObjSize: z.string(),
  getPath: z.string(),
  getRemoteUrl: z.unknown(),
  getURL: z.string(),
  hasPreviewImage: z.unknown(),
  head_title: z.unknown(),
  id: z.string(),
  image_field: z.string().nullable(),
  image_scales: z.unknown(),
  in_response_to: z.unknown(),
  is_folderish: z.boolean(),
  last_comment_date: z.unknown(),
  listCreators: z.array(z.string()),
  location: z.unknown(),
  mime_type: z.string(),
  modified: z.string(),
  nav_title: z.unknown(),
  portal_type: z.string(),
  review_state: z.string(),
  start: z.unknown(),
  sync_uid: z.unknown(),
  title: z.string(),
  total_comments: z.number(),
});

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
