export interface ControlPanelFieldset {
  id: string;
  title: string;
  fields: string[];
}

export interface ControlPanelSchema {
  fieldsets: ControlPanelFieldset[];
  properties: Record<string, any>;
  required: string[];
}

export interface Controlpanel {
  '@id': string;
  group: string;
  title: string;
  schema?: ControlPanelSchema;
  data?: Record<string, any>;
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
