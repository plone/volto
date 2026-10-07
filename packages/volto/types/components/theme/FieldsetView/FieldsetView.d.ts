/**
 * FieldsetView component.
 * @module components/theme/FieldsetView/FieldsetView
 */
import type { JSONSchema, JSONSchemaFieldsets } from '@plone/types';
export type FieldsetViewProps = {
    /** The fieldset to render, as declared by the schema. */
    fieldset: JSONSchemaFieldsets;
    /** The schema the fieldset belongs to: a content type's, or a block's. */
    schema: JSONSchema | undefined;
    /** The content object or block data holding the fields' values. */
    data: Record<string, any>;
};
/**
 * One fieldset of a schema-driven view, used both by the default content view
 * for content types without blocks and by the default block view.
 *
 * The `default` fieldset is rendered without a heading, since its title says
 * nothing the page does not already say.
 */
declare const FieldsetView: ({ fieldset, schema, data }: FieldsetViewProps) => import("react/jsx-runtime").JSX.Element;
export default FieldsetView;
