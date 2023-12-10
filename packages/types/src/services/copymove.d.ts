interface CopyMoveObject {
  source: string;
  target: string;
}

export interface CopyMoveResponse extends Array<CopyMoveObject> {}
