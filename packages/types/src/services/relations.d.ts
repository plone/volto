export interface GetRelationsListResponse {
  '@id': string;
  broken: unknown;
  stats: {
    comprisesComponentPart: number;
    relatedItems: number;
  };
}

interface RelationItem {
  source: {
    '@id': string;
    '@type': string;
    UID: string;
    description: string;
    review_state: string;
    title: string;
    type_title: string;
  };
  target: {
    '@id': string;
    '@type': string;
    UID: string;
    description: string;
    review_state: string;
    title: string;
    type_title: string;
  };
}

export interface GetRelationsResponse {
  '@id': string;
  relations: {
    [key in string]: {
      items: RelationItem[];
      items_total: number;
      readonly?: boolean;
      staticCatalogVocabularyQuery?: unknown;
    };
  };
}
