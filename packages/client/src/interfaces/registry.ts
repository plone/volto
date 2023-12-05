import { z } from 'zod';

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

interface Item {
  name: string;
  schema: {
    properties: SchemaProperties;
  };
  value: any;
}

export interface GetRegistriesResponse {
  '@id': string;
  batching: Batching;
  items: Item[];
  items_total: number;
}

export const updateRegistryDataSchema = z.record(z.any());
