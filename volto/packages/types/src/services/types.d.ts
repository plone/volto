export interface Type {
  '@id': string;
  addable: boolean;
  id: string;
  immediately_addable: boolean;
  title: string;
}

export interface GetTypesResponse extends Array<Type> {}

export interface Fieldset {
  behavior: string;
  description?: string;
  fields: string[];
  id: string;
  title: string;
}

export interface GetTypeResponse {
  fieldsets: Fieldset[];
  layouts: string[];
  properties: {
    [key: string]: {
      behavior: string;
      default?: any;
      description: string;
      factory: string;
      title: string;
      type: string;
      widget?: string;
      vocabulary?: {
        '@id': string;
      };
      choices?: [string, string][];
      enum?: string[];
      enumNames?: string[];
      additionalItems?: boolean;
      items?: {
        description: string;
        factory: string;
        title: string;
        type: string;
      };
      uniqueItems?: boolean;
      widgetOptions?: {
        [key: string]: any;
      };
    };
  };
  required: string[];
  title: string;
  type: string;
}

export interface CreateTypeFieldResponse extends Fieldset {
  factory: string;
  type: string;
  widget: string;
}

export interface GetTypeFieldResponse extends Fieldset {}
