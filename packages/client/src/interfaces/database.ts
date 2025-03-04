export interface DatabaseResponse {
  '@id': string;
  cache_detail_length: Array<{
    connection: string;
    ngsize: number;
    size: number;
  }>;
  cache_length: number;
  cache_length_bytes: number;
  cache_size: number;
  database_size: number;
  db_number: string;
  db_size: number;
}
