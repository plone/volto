import type { ContentBase } from '../base';

export interface LinkContent extends ContentBase {
  '@type': 'Link';
  remoteUrl: string;
}

declare module '../index' {
  interface ContentTypeMap {
    Link: LinkContent;
  }
}
