interface Batching {
  '@id': string;
  first: string;
  last: string;
  next: string;
}

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

export interface GetRegistriesResponse {
  '@id': string;
  batching: Batching;
  items: RegistryItem[];
  items_total: number;
}
