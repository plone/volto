import { Expanders } from './content/common';

interface Item {
  '@id': string;
  '@type': string;
  description: string;
  review_state: string;
  title: string;
  type_title: string;
}

export interface GetNavrootResponse {
  '@id': string;
  navroot: {
    '@components': Expanders;
    '@id'?: string;
    '@type': string;
    UID: string;
    allow_discussion: boolean;
    contributors: string[];
    created?: string;
    creators: string[];
    description: string;
    effective: string | null;
    exclude_from_nav: boolean;
    expires: string | null;
    id: string;
    is_folderish: boolean;
    items: Array<Item>;
    items_total: number;
    language: {
      title: string;
      token: string;
    };
    layout?: string;
    lock: {
      locked: boolean;
      stealable: boolean;
    };
    modified?: string;
    next_item?: {
      '@id': string;
      '@type': string;
      description: string;
      title: string;
      type_title: string;
    };
    parent: {
      '@id': string;
      '@type': string;
      description: string;
      title: string;
      type_title: string;
    };
    previous_item?: {
      '@id': string;
      '@type': string;
      description: string;
      title: string;
      type_title: string;
    };
    relatedItems: any[];
    review_state: string;
    rights: string;
    subjects: string[];
    table_of_contents?: boolean | null;
    text?: string;
    title: string;
    type_title: string;
    version?: string;
    working_copy?: string | null;
    working_copy_of?: string | null;
  };
}
