export interface Controlpanel {
  '@id': string;
  group: string;
  title: string;
}

export interface GetControlpanelsResponse extends Array<Controlpanel> {}

export interface GetControlpanelResponse {
  '@id': string;
  data: any;
  group: string;
  schema: any;
  items?: any;
  title: string;
}
