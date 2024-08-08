export interface NavigationItem {
  '@id': string;
  description: string;
  items: unknown[];
  review_state: string;
  title: string;
}

export interface NavigationResponse {
  '@id': string;
  items: NavigationItem[];
}
