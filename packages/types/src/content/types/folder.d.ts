import type { ContentBase } from '../base';

export interface FolderContent extends ContentBase {
  '@type': 'Folder';
}

declare module '../index' {
  interface ContentTypeMap {
    Folder: FolderContent;
  }
}
