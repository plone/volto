interface Object {
  icon: string;
  id: string;
  title: string;
  url: string;
}

export interface ActionsResponse {
  document_actions: Object[];
  object: Object[];
  object_buttons: Object[];
  portal_tabs: Object[];
  site_actions: Object[];
  user: Object[];
}
