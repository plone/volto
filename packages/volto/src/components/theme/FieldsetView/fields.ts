/**
 * Field definition helpers for the fieldset-based (non-blocks) view.
 * @module components/theme/FieldsetView/fields
 */
import { applyTaggedValues } from '@plone/volto/helpers/Widget/taggedValues';
import type { GetTypeResponse, JSONSchema } from '@plone/types';

type SchemaProperty = GetTypeResponse['properties'][string];

/**
 * A schema property, resolved for rendering: the property as the backend sent
 * it, with its tagged values applied and its own `id` attached.
 *
 * `widget` is whatever should render the field — the `frontendOptions` hint
 * when there is one, the schema's own `widget` otherwise — and `_widget` holds
 * the declared widget that a hint displaced, if any.
 */
export type FieldDefinition = Omit<Partial<SchemaProperty>, 'widget'> & {
  id: string;
  widget?: string;
  _widget?: string;
};

/**
 * Build the definition of a single field from the content type schema.
 */
export const getFieldDefinition = (
  schema: JSONSchema | undefined,
  fieldName: string,
): FieldDefinition =>
  applyTaggedValues({
    // `JSONSchema.properties` is typed as a bare `object` on this branch.
    ...(schema?.properties as Record<string, any> | undefined)?.[fieldName],
    id: fieldName,
  });

/**
 * Build the definitions of the named fields, in the order given.
 *
 * A fieldset with no `fields` yields an empty list rather than throwing.
 */
export const getFields = (
  schema: JSONSchema | undefined,
  fieldnames: string[] | undefined,
): FieldDefinition[] =>
  (fieldnames ?? []).map((fieldName) => getFieldDefinition(schema, fieldName));
