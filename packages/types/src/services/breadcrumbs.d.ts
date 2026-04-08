interface BreadcrumbItem {
  '@id': string;
  title: string;
}

export interface BreadcrumbsResponse {
  '@id': string;
  items: BreadcrumbItem[];
  root: string;
}
