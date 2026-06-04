import type { ContentBase } from '../base';

export interface NewsItemContent extends ContentBase {
  '@type': 'News Item';
  text: {
    'content-type': string;
    data: string;
    encoding: string;
  } | null;
  image_caption: string | null;
}

declare module '../index' {
  interface ContentTypeMap {
    'News Item': NewsItemContent;
  }
}
