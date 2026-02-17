interface Vocabulary {
  '@id': string;
  title: string;
}

export interface GetVocabulariesResponse extends Array<Vocabulary> {}

export interface GetVocabularyResponse {
  '@id': string;
  items: Array<{
    title: string;
    token: string;
  }>;
  items_total: number;
}
