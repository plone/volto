export interface ContextNavigationResponse {
  '@id': string;
  available: boolean;
  has_custom_name: boolean;
  items: unknown[];
  title: string;
  url: string;
}
