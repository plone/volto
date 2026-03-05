import { useEffect } from 'react';
import config from '@plone/registry';
import type {
  WidgetsConfigById,
  WidgetsConfigByFactory,
  WidgetsConfigByType,
  WidgetsConfigByVocabulary,
  WidgetsConfigByWidget,
  Content,
} from '@plone/types';
import { useFieldFocusedAtom } from '@plone/helpers';
import { useFieldContext } from './Form';
import { type PrimitiveAtom } from 'jotai';
import { type DeepKeys } from '@tanstack/react-form';

interface BaseFieldProps {
  id?: keyof WidgetsConfigById;
  className?: string;
  label: string;
  name: DeepKeys<Content>;
  defaultValue?: unknown;
  required?: boolean;
  error?: Array<unknown>;
  widget?: keyof WidgetsConfigByWidget;
  vocabulary?: { '@id': keyof WidgetsConfigByVocabulary };
  choices?: Array<[string, string]>;
  type?: keyof WidgetsConfigByType;
  mode?: string;
  widgetOptions?: {
    [key: string]: any;
  };
  factory?: keyof WidgetsConfigByFactory;
  onChange?: (value: any) => void;
  placeholder?: string;
  title?: string /* To remove? */;
  value: any;
}

type AtomFieldProps = BaseFieldProps & {
  formAtom: PrimitiveAtom<Content>;
};

type FormFieldProps = BaseFieldProps & {
  formAtom?: undefined;
};

export type FieldProps = AtomFieldProps | FormFieldProps;

const MODE_HIDDEN = 'hidden'; //hidden mode. If mode is hidden, field is not rendered
/**
 * Get default widget
 */
const getWidgetDefault = (): React.ComponentType<any> =>
  config.widgets?.default;

/**
 * Get widget by field's `id` attribute
 */
const getWidgetByFieldId = (
  id: FieldProps['id'],
): React.ComponentType<any> | null =>
  typeof id === 'string' ? (config.getWidget(id) ?? null) : null;

/**
 * Get widget by factory attribute
 */
const getWidgetByFactory = (
  factory: FieldProps['factory'],
): React.ComponentType<any> | null =>
  factory ? (config.getWidget(factory) ?? null) : null;

/**
 * Get widget by field's `widget` attribute
 */
const getWidgetByName = (
  widget: FieldProps['widget'],
): React.ComponentType<any> | null =>
  typeof widget === 'string'
    ? (config.getWidget(widget) ?? getWidgetDefault())
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
const getWidgetFromTaggedValues = (widgetOptions?: {
  frontendOptions?: { widget: FieldProps['widget']; widgetProps: any };
}): React.ComponentType<any> | null =>
  typeof widgetOptions?.frontendOptions?.widget === 'string'
    ? (config.getWidget(widgetOptions.frontendOptions.widget) ?? null)
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
const getWidgetPropsFromTaggedValues = (widgetOptions?: {
  frontendOptions?: { widget: string; widgetProps: any };
}): Record<string, any> | null =>
  typeof widgetOptions?.frontendOptions?.widgetProps === 'object'
    ? widgetOptions.frontendOptions.widgetProps
    : null;

/**
 * Get widget by field's `vocabulary` attribute
 */
const getWidgetByVocabulary = (
  vocabulary: FieldProps['vocabulary'],
): React.ComponentType<any> | null => {
  const vocabId = vocabulary?.['@id'];
  if (!vocabId) return null;

  const key = vocabId.replace(/^.*\/@vocabularies\//, '');
  return config.getWidget(key) ?? null;
};

/**
 * Get widget by field's hints `vocabulary` attribute in widgetOptions
 */
const getWidgetByVocabularyFromHint = (
  props: FieldProps,
): React.ComponentType<any> | null => {
  const vocabId = props.widgetOptions?.vocabulary?.['@id'];
  if (!vocabId) return null;

  const key = vocabId.replace(/^.*\/@vocabularies\//, '');
  return config.getWidget(key) ?? null;
};

/**
 * Get widget by field's `choices` attribute
 */
const getWidgetByChoices = (
  props: FieldProps,
): React.ComponentType<any> | null =>
  props.choices || props.vocabulary ? (config.widgets?.choices ?? null) : null;

/**
 * Get widget by field's `type` attribute
 */
const getWidgetByType = (
  type: FieldProps['type'],
): React.ComponentType<any> | null =>
  type ? (config.getWidget(type) ?? null) : null;

const renderFieldWidget = ({
  fieldProps,
  onFieldChange,
}: {
  fieldProps: FieldProps;
  onFieldChange: (value: any) => void;
}) => {
  const Widget =
    getWidgetByFieldId(fieldProps.id) ||
    getWidgetFromTaggedValues(fieldProps.widgetOptions) ||
    getWidgetByName(fieldProps.widget) ||
    getWidgetByChoices(fieldProps) ||
    getWidgetByVocabulary(fieldProps.vocabulary) ||
    getWidgetByVocabularyFromHint(fieldProps) ||
    getWidgetByFactory(fieldProps.factory) ||
    getWidgetByType(fieldProps.type) ||
    getWidgetDefault();

  // Adding the widget props from tagged values (if any)
  const widgetProps = {
    ...fieldProps,
    label: fieldProps.title,
    placeholder: fieldProps.placeholder || 'Type something...',
    ...getWidgetPropsFromTaggedValues(fieldProps.widgetOptions),
  };

  return fieldProps.mode !== MODE_HIDDEN ? (
    <Widget
      {...widgetProps}
      onChange={(value: any) => {
        fieldProps.onChange?.(value);
        onFieldChange(value);
      }}
    />
  ) : null;
};

const AtomField = (props: AtomFieldProps) => {
  const field = useFieldContext();
  const value = field.state.value;

  const [fieldValue, setField] = useFieldFocusedAtom<
    Content,
    DeepKeys<Content>
  >(props.formAtom, props.name);

  // atom -> form (programmatic update; runs TanStack Form’s flow)
  useEffect(() => {
    if (fieldValue !== value) {
      // prefer handleChange to keep validators/touched consistent
      field.handleChange(fieldValue as typeof value);
    }
  }, [fieldValue, value, field]);

  return renderFieldWidget({
    fieldProps: props,
    onFieldChange: (value: any) => {
      setField(value);
      return field.handleChange(value);
    },
  });
};

const FormField = (props: FormFieldProps) => {
  const field = useFieldContext();

  return renderFieldWidget({
    fieldProps: props,
    onFieldChange: (value: any) => field.handleChange(value),
  });
};

const Field = (props: FieldProps) => {
  if ('formAtom' in props && props.formAtom) {
    return <AtomField {...props} />;
  }

  return <FormField {...props} />;
};

export default Field;
