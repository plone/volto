/**
 * Tagged values (`frontendOptions`) helpers.
 * @module helpers/Widget/taggedValues
 */

/**
 * The hints a backend schema can attach to a field with
 * `directives.widget(..., frontendOptions={...})`.
 *
 * `widget` and `widgetProps` are handled specially; every other key (`format`,
 * for instance) is merged onto the field as-is.
 */
export type FrontendOptions = {
  widget?: string;
  widgetProps?: Record<string, any>;
  [key: string]: any;
};

export type TaggedField = Record<string, any> & {
  widget?: string;
  _widget?: string;
  widgetOptions?: Record<string, any> & {
    frontendOptions?: FrontendOptions;
  };
};

/**
 * Apply a field's tagged values to the field definition itself.
 *
 * The backend declares frontend hints under `widgetOptions.frontendOptions`.
 * Applying them before any widget resolution means both the edit and the view
 * side see one already-normalized field, instead of each having to know where
 * the hints live.
 *
 * A hinted `widget` wins over the one the schema declares, and the displaced
 * value is kept as `_widget`, so resolution can fall back to it when the hinted
 * widget is not registered — which is what happens when the add-on providing it
 * is not installed.
 *
 * @param field The field definition, as sent by the backend.
 * @returns The field, with its tagged values applied. The same object is
 * returned untouched when the field carries no hints.
 */
export const applyTaggedValues = <T extends TaggedField>(
  field: T,
): T & TaggedField => {
  const frontendOptions = field?.widgetOptions?.frontendOptions;

  if (!frontendOptions) {
    return field;
  }

  const { widget, widgetProps, ...rest } = frontendOptions;

  return {
    ...field,
    ...rest,
    ...widgetProps,
    ...(widget ? { widget, _widget: field.widget } : {}),
  } as T & TaggedField;
};
