import type { PreviewImage } from '../content/common';

export interface Brain {
  '@id': string;
  '@type': string;
  CreationDate: string;
  Creator: string;
  Date: string;
  Description: string;
  EffectiveDate: string | 'None'; // 'None' here is just for documentation
  ExpirationDate: string | 'None'; // 'None' here is just for documentation
  ModificationDate: string;
  Subject: string[];
  Title: string;
  Type: string;
  UID: string;
  author_name: string | null;
  cmf_uid: string | null;
  commentators: string[];
  created: string;
  description: string;
  effective: string | '1969-12-31T00:00:00+00:00'; // '1969-12-31T00:00:00+00:00' here is just for documentation
  end: string | null;
  exclude_from_nav: boolean;
  expires: string | '2499-12-31T00:00:00+00:00'; // '2499-12-31T00:00:00+00:00' here is just for documentation
  getIcon: string | null; // TODO is this correct?
  getId: string;
  getObjSize: string;
  getPath: string;
  getRemoteUrl: string | null;
  getURL: string;
  hasPreviewImage: boolean | null; // TODO is this correct?
  head_title: string | null; // TODO is this correct?
  id: string;
  image_field: string; // TODO could this be more specific?
  image_scales: Record<string, PreviewImage> | null; // TODO could this be more specific?
  in_response_to: string | null; // TODO is this correct?
  is_folderish: boolean;
  last_comment_date: string | null;
  listCreators: string[];
  location: string | null; // TODO is this correct?
  mime_type: string; // TODO could this be more specific?
  modified: string;
  nav_title: string | null; // TODO is this correct?
  portal_type: string; // TODO could this be more specific?
  review_state: string; // TODO could this be more specific?
  start: string | null;
  sync_uid: string | null;
  title: string;
  total_comments: number;
  type_title: string; // TODO could this be more specific?
}
