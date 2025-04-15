interface FieldSet {
  behavior: string;
  fields: string[];
  id: string;
  title: string;
}

interface Property {
  description: string;
  factory: string;
  title: string;
  type: string;
  widget?: string;
  properties?: {
    [key: string]: {
      default?: string;
      description: string;
      factory: string;
      title: string;
      type: string;
    };
  };
}

export interface GetUserschemaResponse {
  fieldsets: FieldSet[];
  properties: {
    fullname: Property;
    email: Property;
    home_page: Property;
    description: Property;
    location: Property;
    portrait: Property & {
      properties: {
        'portrait.contentType': Property;
        'portrait.data': Property;
        'portrait.filename': Property;
      };
    };
  };
  required: string[];
  type: string;
}
