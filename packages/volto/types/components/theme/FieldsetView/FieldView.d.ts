import type { FieldDefinition } from './fields';
export type FieldViewProps = {
    /** The field to render, as returned by `getFieldDefinition`. */
    field: FieldDefinition;
    /** The content object holding the field's value. */
    data: Record<string, any>;
};
/**
 * A single field of the fieldset-based (non-blocks) view: its label and its
 * value, rendered by the view widget the schema asks for.
 *
 * The field definition is handed to the widget as props, the way the edit side
 * does it, so that the `widgetProps` a backend declares through
 * `frontendOptions` reach the widget. The value is applied last, so nothing the
 * schema carries can shadow it.
 *
 * The title is rendered bare, without a label, since it is the heading of the
 * page rather than one field among others.
 */
declare const FieldView: ({ field, data }: FieldViewProps) => import("react/jsx-runtime").JSX.Element;
export default FieldView;
