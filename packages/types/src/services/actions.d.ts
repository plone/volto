interface Action {
  icon: string;
  id: string;
  title: string;
  url: string;
}

export interface ActionsResponse {
  document_actions: Action[];
  object: Action[];
  object_buttons: Action[];
  portal_tabs: Action[];
  site_actions: Action[];
  user: Action[];
}
