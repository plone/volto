import type { ContentBase } from '../base';
import type { Image } from '../common';

export interface ImageContent extends ContentBase {
  '@type': 'Image';
  image: Image;
}

declare module '../index' {
  interface ContentTypeMap {
    Image: ImageContent;
  }
}
