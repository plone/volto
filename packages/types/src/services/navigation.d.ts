export interface NavigationItem {
  '@id': string;
  description: string;
  items: NavigationItem[];
  review_state: string;
  title: string;
}

export interface NavigationResponse {
  '@id': string;
  items: NavigationItem[];
}
