interface Vocabularies {
  '@id': string;
  title: string;
}

export interface GetVocabulariesListResponse extends Array<Vocabularies> {}

export interface GetVocabulariesResponse {
  '@id': string;
  items: Array<{
    title: string;
    token: string;
  }>;
  items_total: number;
}
