export interface RecycleBinActionLinks {
  restore: string;
  purge: string;
}

export interface RecycleBinItemSummary {
  '@id': string;
  '@type': string;
  id: string;
  title: string;
  path: string;
  parent_path: string;
  deletion_date: string;
  recycle_id: string;
  deleted_by: string;
  language: string;
  review_state: string;
  has_children: boolean;
  actions: RecycleBinActionLinks;
}

export interface RecycleBinChildItem {
  id: string;
  title: string;
  '@type': string;
  path: string;
  restore_id: string;
  language: string;
  review_state: string;
  children_count?: number;
}

export interface GetRecycleBinResponse {
  '@id': string;
  items_total: number;
  batching?: Record<string, string>;
  items: RecycleBinItemSummary[];
}

export interface GetRecycleBinItemResponse extends RecycleBinItemSummary {
  items_total: number;
  batching?: Record<string, string>;
  items: RecycleBinChildItem[];
}

export interface RestoreRecycleBinItemData {
  target_path?: string;
  restore_id?: string;
}

export interface RestoreRecycleBinItemResponse {
  status: 'success';
  message: string;
  restored_item: {
    '@id': string;
    id: string;
    title: string;
    '@type': string;
  };
}

export interface RecycleBinQuery {
  title?: string;
  path?: string;
  portal_type?: string;
  date_from?: string;
  date_to?: string;
  deleted_by?: string;
  has_subitems?: boolean;
  language?: string;
  review_state?: string;
  sort_on?: 'title' | 'portal_type' | 'path' | 'deletion_date' | 'review_state';
  sort_order?: 'ascending' | 'descending';
  b_start?: number | string;
  b_size?: number | string;
}
