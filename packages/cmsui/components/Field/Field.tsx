import config from '@plone/registry';
import type {
  WidgetsConfigById,
  WidgetsConfigByFactory,
  WidgetsConfigByType,
  WidgetsConfigByVocabulary,
  WidgetsConfigByWidget,
} from '@plone/types';

type FieldProps = {
  id: keyof WidgetsConfigById;
  widget: keyof WidgetsConfigByWidget;
  vocabulary: { '@id': keyof WidgetsConfigByVocabulary };
  choices: string;
  type: keyof WidgetsConfigByType;
  focus: boolean;
  mode: string;
  widgetOptions: any;
  factory: keyof WidgetsConfigByFactory;
  onChange: (id: string, value: any) => void;
  placeholder: string;
  title: string;
};

const MODE_HIDDEN = 'hidden'; //hidden mode. If mode is hidden, field is not rendered

/**
 * Get default widget
 */
const getWidgetDefault = (): React.ComponentType<any> => config.widgets.default;

/**
 * Get widget by field's `id` attribute
 */
const getWidgetByFieldId = (
  id: FieldProps['id'],
): React.ComponentType<any> | null => config.widgets.id[id] || null;

/**
 * Get widget by factory attribute
 */
const getWidgetByFactory = (
  factory: FieldProps['factory'],
): React.ComponentType<any> | null => config.widgets.factory?.[factory] || null;

/**
 * Get widget by field's `widget` attribute
 */
const getWidgetByName = (
  widget: FieldProps['widget'],
): React.ComponentType<any> | null =>
  typeof widget === 'string'
    ? config.widgets.widget[widget] || getWidgetDefault()
    : null;

/**
 * Get widget by tagged values
 *

directives.widget(
    'fieldname',
    frontendOptions={
        "widget": 'specialwidget',
        "version": 'extra'
    })

 */
const getWidgetFromTaggedValues = (widgetOptions: {
  frontendOptions: { widget: FieldProps['widget']; widgetProps: any };
}): React.ComponentType<any> | null =>
  typeof widgetOptions?.frontendOptions?.widget === 'string'
    ? config.widgets.widget[widgetOptions.frontendOptions.widget]
    : null;

/**
 * Get widget props from tagged values
 *

directives.widget(
    "fieldname",
    frontendOptions={
        "widget": "specialwidget",
        "widgetProps": {"prop1": "specialprop"}
    })

 */
const getWidgetPropsFromTaggedValues = (widgetOptions: {
  frontendOptions: { widget: string; widgetProps: any };
}): React.ComponentType<any> | null =>
  typeof widgetOptions?.frontendOptions?.widgetProps === 'object'
    ? widgetOptions.frontendOptions.widgetProps
    : null;

/**
 * Get widget by field's `vocabulary` attribute
 */
const getWidgetByVocabulary = (
  vocabulary: FieldProps['vocabulary'],
): React.ComponentType<any> | null =>
  vocabulary && vocabulary['@id']
    ? config.widgets.vocabulary[
        vocabulary['@id'].replace(
          /^.*\/@vocabularies\//,
          '',
        ) as keyof WidgetsConfigByVocabulary
      ]
    : null;

/**
 * Get widget by field's hints `vocabulary` attribute in widgetOptions
 */
const getWidgetByVocabularyFromHint = (
  props: FieldProps,
): React.ComponentType<any> | null =>
  props.widgetOptions && props.widgetOptions.vocabulary
    ? config.widgets.vocabulary[
        props.widgetOptions.vocabulary['@id'].replace(
          /^.*\/@vocabularies\//,
          '',
        ) as keyof WidgetsConfigByVocabulary
      ]
    : null;

/**
 * Get widget by field's `choices` attribute
 */
const getWidgetByChoices = (
  props: FieldProps,
): React.ComponentType<any> | null => {
  if (props.choices) {
    return config.widgets.choices;
  }

  if (props.vocabulary) {
    // If vocabulary exists, then it means it's a choice field in disguise with
    // no widget specified that probably contains a string then we force it
    // to be a select widget instead
    return config.widgets.choices;
  }

  return null;
};

/**
 * Get widget by field's `type` attribute
 */
const getWidgetByType = (type: FieldProps['type']): React.ComponentType<any> =>
  config.widgets.type[type] || null;

const Field = (props: FieldProps) => {
  const Widget =
    getWidgetByFieldId(props.id) ||
    getWidgetFromTaggedValues(props.widgetOptions) ||
    getWidgetByName(props.widget) ||
    getWidgetByChoices(props) ||
    getWidgetByVocabulary(props.vocabulary) ||
    getWidgetByVocabularyFromHint(props) ||
    getWidgetByFactory(props.factory) ||
    getWidgetByType(props.type) ||
    getWidgetDefault();

  if (props.mode === MODE_HIDDEN) {
    return null;
  }

  // Adding the widget props from tagged values (if any)
  const widgetProps = {
    ...props,
    label: props.title,
    placeholder: props.placeholder || 'Type something...',
    // Temporary translator from the old widget signature (id, value) to the new one (value)
    onChange: (arg1: string, arg2: string | undefined) => {
      if (!arg2 === undefined) {
        props.onChange(props.id, arg1);
      } else {
        props.onChange(props.id, arg2);
      }
    },
    ...getWidgetPropsFromTaggedValues(props.widgetOptions),
  };

  return <Widget {...widgetProps} />;
};

export default Field;
