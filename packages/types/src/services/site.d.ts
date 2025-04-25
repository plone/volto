export interface GetSiteResponse {
  '@id': string;
  'plone.allowed_sizes': string[];
  'plone.robots_txt': string;
  'plone.site_logo': string;
  'plone.site_title': string;
  'plone.default_language': string;
  'plone.portal_timezone': string;
  features: {
    [key: string]: unknown;
  };
  'plone.available_languages': {
    [key: string]: string;
  };
}
