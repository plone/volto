import type { Batching } from './common';

interface SchemaProperties {
  description: string;
  factory: string;
  title: string;
  type: string;
}

interface RegistryItem {
  name: string;
  schema: {
    properties: SchemaProperties;
  };
  value: any;
}

export interface GetRegistryResponse {
  '@id': string;
  batching: Batching;
  items: RegistryItem[];
  items_total: number;
}
