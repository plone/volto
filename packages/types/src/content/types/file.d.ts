import type { ContentBase } from '../base';

export interface FileContent extends ContentBase {
  '@type': 'File';
  file: {
    'content-type': string;
    download: string;
    filename: string;
    size: number;
  } | null;
}

declare module '../index' {
  interface ContentTypeMap {
    File: FileContent;
  }
}
