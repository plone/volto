export interface WidgetsConfigById {
  schema: React.ComponentType;
  subjects: React.ComponentType;
  query: React.ComponentType;
  recurrence: React.ComponentType;
  remoteUrl: React.ComponentType;
  id: React.ComponentType;
  site_logo: React.ComponentType;
}

export interface WidgetsConfigByWidget {
  textarea: React.ComponentType;
  datetime: React.ComponentType;
  date: React.ComponentType;
  password: React.ComponentType;
  file: React.ComponentType;
  align: React.ComponentType;
  buttons: React.ComponentType;
  url: React.ComponentType;
  internal_url: React.ComponentType;
  email: React.ComponentType;
  array: React.ComponentType;
  token: React.ComponentType;
  query: React.ComponentType;
  query_sort_on: React.ComponentType;
  querystring: React.ComponentType;
  object_browser: React.ComponentType;
  object: React.ComponentType;
  object_list: React.ComponentType;
  vocabularyterms: React.ComponentType;
  image_size: React.ComponentType;
  select_querystring_field: React.ComponentType;
  autocomplete: React.ComponentType;
  color_picker: React.ComponentType;
  select: React.ComponentType;
}

export interface WidgetsConfigByVocabulary {
  'plone.app.vocabularies.Catalog': React.ComponentType;
}

export interface WidgetsConfigByFactory {
  'Relation List': React.ComponentType;
  'Relation Choice': React.ComponentType;
}

export interface WidgetsConfigByType {
  boolean: React.ComponentType;
  array: React.ComponentType;
  object: React.ComponentType;
  datetime: React.ComponentType;
  date: React.ComponentType;
  password: React.ComponentType;
  number: React.ComponentType;
  integer: React.ComponentType;
  id: React.ComponentType;
}

export interface WidgetsConfigViewById {
  file: React.ComponentType;
  image: React.ComponentType;
  relatedItems: React.ComponentType;
  subjects: React.ComponentType;
}

export interface WidgetsConfigViewByWidget {
  array: React.ComponentType;
  boolean: React.ComponentType;
  choices: React.ComponentType;
  date: React.ComponentType;
  datetime: React.ComponentType;
  description: React.ComponentType;
  email: React.ComponentType;
  file: React.ComponentType;
  image: React.ComponentType;
  password: React.ComponentType;
  relation: React.ComponentType;
  richtext: React.ComponentType;
  string: React.ComponentType;
  tags: React.ComponentType;
  textarea: React.ComponentType;
  title: React.ComponentType;
  url: React.ComponentType;
  internal_url: React.ComponentType;
  object: React.ComponentType;
}

export interface WidgetsConfigViewByType {
  array: React.ComponentType;
  boolean: React.ComponentType;
}

export interface WidgetsConfigViews {
  getWidget: React.ComponentType;
  default: React.ComponentType;
  id: WidgetsConfigViewById;
  widget: WidgetsConfigViewByWidget;
  vocabulary: {};
  choices: React.ComponentType;
  type: WidgetsConfigViewByType;
}

export interface WidgetsConfig {
  default: React.ComponentType;
  id: WidgetsConfigById;
  widget: WidgetsConfigByWidget;
  vocabulary: WidgetsConfigByVocabulary;
  factory: WidgetsConfigByFactory;
  choices: React.ComponentType;
  type: WidgetsConfigByType;
  views: WidgetsConfigViews;
}
