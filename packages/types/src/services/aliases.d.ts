export interface GetAliasesResponse {
  '@id': string;
  items: Array<{
    path: string;
  }>;
  items_total: number;
}

export interface GetAllAliasesResponse {
  '@id': string;
  items: Array<{
    datetime: string;
    manual: boolean;
    path: string;
    'redirect-to': string;
  }>;
  items_total: number;
}
