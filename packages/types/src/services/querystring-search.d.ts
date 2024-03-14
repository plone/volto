interface ResultItem {
  '@id': string;
  '@type': string;
  description: string;
  review_state: string;
  title: string;
  type_title: string;
}

export interface QuerystringSearchResponse {
  '@id': string;
  items: ResultItem[];
  items_total: number;
}
