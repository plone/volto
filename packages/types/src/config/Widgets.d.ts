export type WidgetIdsTypes =
  | (string & {})
  | 'schema'
  | 'subjects'
  | 'query'
  | 'recurrence'
  | 'remoteUrl'
  | 'id'
  | 'site_logo'
  | 'preview_image_link';

export type WidgetsConfigById<
  K extends WidgetIdsTypes = WidgetIdsTypes,
  P = any,
> = Partial<{
  [id in K]: React.ComponentType<P>;
}> & {
  [custom: string]: React.ComponentType<P>;
};

export type WidgetByWidgetTypes =
  | (string & {})
  | 'textarea'
  | 'datetime'
  | 'date'
  | 'password'
  | 'file'
  | 'image'
  | 'align'
  | 'buttons'
  | 'url'
  | 'internal_url'
  | 'email'
  | 'array'
  | 'token'
  | 'query'
  | 'query_sort_on'
  | 'querystring'
  | 'object_browser'
  | 'object'
  | 'object_list'
  | 'vocabularyterms'
  | 'image_size'
  | 'select_querystring_field'
  | 'autocomplete'
  | 'color_picker'
  | 'select'
  | 'schema'
  | 'static_text'
  | 'hidden'
  | 'radio_group'
  | 'checkbox_group'
  | 'blockAlignment'
  | 'blockWidth'
  | 'size';

export type WidgetsConfigByWidget<
  K extends WidgetByWidgetTypes = WidgetByWidgetTypes,
  P = any,
> = Partial<{
  [widgetType in K]: React.ComponentType<P>;
}>;

export type WidgetVocabularyTypes =
  | (string & {})
  | 'plone.app.vocabularies.Catalog';

export type WidgetsConfigByVocabulary<
  K extends WidgetVocabularyTypes = WidgetVocabularyTypes,
  P = any,
> = Partial<{
  [vocabularyName in K]: React.ComponentType<P>;
}>;

export type WidgetFactortTypes =
  | (string & {})
  | 'Relation List'
  | 'Relation Choice';

export type WidgetsConfigByFactory<
  K extends WidgetFactortTypes = WidgetFactortTypes,
  P = any,
> = Partial<{
  [factoryName in K]: React.ComponentType<P>;
}>;

export type WidgetByTypeTypes =
  | (string & {})
  | 'boolean'
  | 'array'
  | 'object'
  | 'date'
  | 'datetime'
  | 'password'
  | 'number'
  | 'integer'
  | 'id';

export type WidgetsConfigByType<
  K extends WidgetByTypeTypes = WidgetByTypeTypes,
  P = any,
> = Partial<{
  [widgetType in K]: React.ComponentType<P>;
}>;
export type WidgetViewsIdTypes =
  | (string & {})
  | 'file'
  | 'image'
  | 'relatedItems'
  | 'subjects';

export type WidgetsConfigViewById<
  K extends WidgetViewsIdTypes = WidgetViewsIdTypes,
  P = any,
> = Partial<{
  [viewId in K]: React.ComponentType<P>;
}>;

export type WidgetByViewTypes =
  | (string & {})
  | 'array'
  | 'boolean'
  | 'choices'
  | 'date'
  | 'datetime'
  | 'password'
  | 'description'
  | 'email'
  | 'file'
  | 'image'
  | 'password'
  | 'relation'
  | 'richtext'
  | 'string'
  | 'tags'
  | 'textarea'
  | 'title'
  | 'url'
  | 'internal_url'
  | 'object';

export type WidgetsConfigViewByWidget<
  K extends WidgetByViewTypes = WidgetByViewTypes,
  P = any,
> = Partial<{
  [widgetTypeByView in K]: React.ComponentType<P>;
}>;

export type WidgetViewByTypeTypes = (string & {}) | 'array' | 'boolean';

export type WidgetsConfigViewByType<
  K extends WidgetViewByTypeTypes = WidgetViewByTypeTypes,
  P = any,
> = Partial<{
  [viewByType in K]: React.ComponentType<P>;
}>;

export interface WidgetsConfigViews<P = any> {
  // getWidget: React.ComponentType<P>;
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
  choices: React.ComponentType<any>;
  type: WidgetsConfigByType;
  views: WidgetsConfigViews;
}

export type NestedKeys<T> = {
  [K in keyof T]: T[K] extends Record<string, React.ComponentType<any>>
    ? K
    : never;
}[keyof T];

export type WidgetKey = NestedKeys<WidgetsConfig>;
