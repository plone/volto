interface Actor {
  '@id': string;
  fullname: string;
  id: string;
  username: string | null;
}

interface ActionEdited {
  '@id': string;
  action: string;
  actor: Actor;
  comments: string;
  may_revert: boolean;
  time: string;
  transition_title: string;
  type: string;
  version: number;
}

interface ActionCreate {
  action: string;
  actor: Actor;
  comments: string;
  review_state: string;
  state_title: string;
  time: string;
  transition_title: string;
  type: string;
}

export type GetHistoryResponse = (ActionCreate | ActionEdited)[];

export interface revertHistoryResponse {
  message: string;
}
