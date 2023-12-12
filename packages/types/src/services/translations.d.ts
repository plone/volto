export interface GetTranslationResponse {
  '@id': string;
  items: Array<{
    '@id': string;
    language: string;
  }>;
  root: RootLanguages;
}

interface RootLanguages {
  [key: string]: string;
}
