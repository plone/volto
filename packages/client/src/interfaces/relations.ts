import { number, z } from 'zod';

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

const RelationDataSchema = z.object({
  relation: z.string(),
  source: z.string(),
  target: z.string(),
});

export const createRelationsDataSchema = z.object({
  items: z.array(RelationDataSchema),
});

export const deleteRelationsDataSchema = z.object({
  items: z.array(RelationDataSchema).optional(),
  relation: z.string().optional(),
  source: z.string().optional(),
  target: z.string().optional(),
});

export const fixRelationsDataSchema = z.object({
  flush: z.number().optional(),
});
