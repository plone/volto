import type { ContentBase } from '../base';

export interface DocumentContent extends ContentBase {
  '@type': 'Document';
  text: {
    'content-type': string;
    data: string;
    encoding: string;
  } | null;
}

declare module '../index' {
  interface ContentTypeMap {
    Document: DocumentContent;
  }
}
