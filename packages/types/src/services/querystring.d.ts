export interface GetQueryStringResponse {
  '@id': string;
  indexes: Indexes;
  sortable_indexes: SortableIndexes;
}

interface Common {
  description: string;
  enabled: boolean;
  fetch_vocabulary: boolean;
  group: string;
  operations?: string[] | null;
  operators: Record<string, any>;
  sortable: boolean;
  title: string;
  values: unknown;
  vocabulary?: string;
}

export interface Indexes {
  Creator: Common;
  Description: Common;
  SearchableText: Common;
  Subject: Common;
  Title: Common;
  created: Common;
  effective: Common;
  effectiveRange: Common;
  end: Common;
  expires: Common;
  getId: Common;
  getObjPositionInParent: Common;
  getRawRelatedItems: Common;
  isDefaultPage: Common;
  isFolderish: Common;
  modified: Common;
  path: Common;
  portal_type: Common;
  review_state: Common;
  show_inactive: Common;
  sortable_title: Common;
  start: Common;
}

export interface SortableIndexes {
  Creator: Common;
  created: Common;
  effective: Common;
  end: Common;
  expires: Common;
  getId: Common;
  getObjPositionInParent: Common;
  modified: Common;
  review_state: Common;
  sortable_title: Common;
  start: Common;
}
