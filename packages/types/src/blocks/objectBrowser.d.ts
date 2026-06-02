import { Brain } from '../services';

export interface ObjectBrowserItem extends Brain {
  // Although specified also in the Brain, they come from the serialization
  '@id': string;
  '@type': Brain['@type'];
  title: string;
}

export type objectBrowserHref = Array<ObjectBrowserItem>;
