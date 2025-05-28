export interface WidgetsConfigById<P = any> {
  schema: React.ComponentType<P>;
  subjects: React.ComponentType<P>;
  query: React.ComponentType<P>;
  recurrence: React.ComponentType<P>;
  remoteUrl: React.ComponentType<P>;
  id: React.ComponentType<P>;
  site_logo: React.ComponentType<P>;
  preview_image_link: React.ComponentType<P>;
}

export interface WidgetsConfigByWidget<P = any> {
  textarea: React.ComponentType<P>;
  datetime: React.ComponentType<P>;
  date: React.ComponentType<P>;
  password: React.ComponentType<P>;
  file: React.ComponentType<P>;
  image: React.ComponentType<P>;
  align: React.ComponentType<P>;
  buttons: React.ComponentType<P>;
  url: React.ComponentType<P>;
  internal_url: React.ComponentType<P>;
  email: React.ComponentType<P>;
  array: React.ComponentType<P>;
  token: React.ComponentType<P>;
  query: React.ComponentType<P>;
  query_sort_on: React.ComponentType<P>;
  querystring: React.ComponentType<P>;
  object_browser: React.ComponentType<P>;
  object: React.ComponentType<P>;
  object_list: React.ComponentType<P>;
  vocabularyterms: React.ComponentType<P>;
  image_size: React.ComponentType<P>;
  select_querystring_field: React.ComponentType<P>;
  autocomplete: React.ComponentType<P>;
  color_picker: React.ComponentType<P>;
  select: React.ComponentType<P>;
  schema: React.ComponentType<P>;
  static_text: React.ComponentType<P>;
  hidden: React.ComponentType<P>;
  radio_group: React.ComponentType<P>;
  checkbox_group: React.ComponentType<P>;
}

export interface WidgetsConfigByVocabulary<P = any> {
  'plone.app.vocabularies.Catalog': React.ComponentType<P>;
}
export type WidgetFactories =
  | (string & {})
  | 'Relation List'
  | 'Relation Choice';

export type WidgetsConfigByFactory<
  K extends WidgetFactories = string & {},
  P = any,
> = {
  [factoryName in K]: React.ComponentType<P>;
} & {
  'Relation List': React.ComponentType<P>;
  // BBB: remove optionality when implementing related widget
  'Relation Choice'?: React.ComponentType<P>;
};

export interface WidgetsConfigByType<P = any> {
  boolean: React.ComponentType<P>;
  array: React.ComponentType<P>;
  object: React.ComponentType<P>;
  datetime: React.ComponentType<P>;
  date: React.ComponentType<P>;
  password: React.ComponentType<P>;
  number: React.ComponentType<P>;
  integer: React.ComponentType<P>;
  id: React.ComponentType<P>;
}

export interface WidgetsConfigViewById<P = any> {
  file: React.ComponentType<P>;
  image: React.ComponentType<P>;
  relatedItems: React.ComponentType<P>;
  subjects: React.ComponentType<P>;
}

export interface WidgetsConfigViewByWidget<P = any> {
  array: React.ComponentType<P>;
  boolean: React.ComponentType<P>;
  choices: React.ComponentType<P>;
  date: React.ComponentType<P>;
  datetime: React.ComponentType<P>;
  description: React.ComponentType<P>;
  email: React.ComponentType<P>;
  file: React.ComponentType<P>;
  image: React.ComponentType<P>;
  password: React.ComponentType<P>;
  relation: React.ComponentType<P>;
  richtext: React.ComponentType<P>;
  string: React.ComponentType<P>;
  tags: React.ComponentType<P>;
  textarea: React.ComponentType<P>;
  title: React.ComponentType<P>;
  url: React.ComponentType<P>;
  internal_url: React.ComponentType<P>;
  object: React.ComponentType<P>;
}

export interface WidgetsConfigViewByType<P = any> {
  array: React.ComponentType<P>;
  boolean: React.ComponentType<P>;
}

export interface WidgetsConfigViews<P = any> {
  getWidget: React.ComponentType<P>;
  default: React.ComponentType<P>;
  id: WidgetsConfigViewById;
  widget: WidgetsConfigViewByWidget;
  vocabulary: {};
  choices: React.ComponentType<P>;
  type: WidgetsConfigViewByType;
}

export interface WidgetsConfig {
  default: React.ComponentType<any>;
  id: WidgetsConfigById;
  widget: WidgetsConfigByWidget;
  vocabulary: WidgetsConfigByVocabulary;
  factory: WidgetsConfigByFactory;
  choices: React.ComponentType;
  type: WidgetsConfigByType;
  views: WidgetsConfigViews;
}
