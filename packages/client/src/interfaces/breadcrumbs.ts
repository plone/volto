interface Item {
  '@id': string;
  title: string;
}

export interface BreadcrumbsResponse {
  '@id': string;
  items: Item[];
  root: string;
}
