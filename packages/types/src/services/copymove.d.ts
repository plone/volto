interface CopyMoveContentObject {
  source: string;
  target: string;
}

export interface CopyMoveContentResponse extends Array<CopyMoveContentObject> {}
